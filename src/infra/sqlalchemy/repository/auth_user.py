from sqlalchemy.orm import Session
from src.infra.sqlalchemy.models import models
from src.schemas import schemas
from passlib.context import CryptContext
from fastapi.exceptions import HTTPException
from sqlalchemy.exc import IntegrityError
from fastapi import status
from jose import JWTError, jwt
from datetime import datetime, timedelta
from decouple import config

SECRET_KEY = config('SECRET_KEY')
ALGORITHM = config('ALGORITHM')

crypt_context = CryptContext(schemes=['sha256_crypt'])

class AuthUser:
    def __init__(self, db: Session):
        self.db = db

    def user_register(self, user: schemas.DadosUsuario):
        user_models = models.Dados(
            username=user.username,
            password=crypt_context.hash(user.password)
        )
        try:
            self.db.add(user_models)
            self.db.commit()
        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Existent user"
            )
        

    def user_login(self, user: schemas.DadosUsuario, expires_in: int = 30):
        user_db = self.db.query(models.Dados).filter_by(username=user.username).first()

        if user_db is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password"
            )
        
        if not crypt_context.verify(user.password, user_db.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password "
            )
        
        exp = datetime.utcnow() + timedelta(minutes=expires_in)

        payload = {
            "sub": user.username,
            "exp": exp
        }

        access_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

        return {
            "access_token": access_token,
            "exp": exp.isoformat()
        }
    
    def verify_token(self, access_token):
        try:
            data = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid access token'
            )
        
        user_on_db = self.db.query(models.Dados).filter_by(username=data['sub']).first()

        if user_on_db is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid access token'
            )
        
