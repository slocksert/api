from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from src.infra.sqlalchemy.config.database import get_db
from src.infra.sqlalchemy.repository.auth_user import AuthUser

oauth_scheme = OAuth2PasswordBearer(tokenUrl='/user/login')

def token_verifier(
    db: Session = Depends(get_db),
    token = Depends(oauth_scheme)
):
    uc = AuthUser(db=db)
    uc.verify_token(access_token=token)