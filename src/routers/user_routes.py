from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from src.infra.sqlalchemy.config.database import get_db
from src.infra.sqlalchemy.repository.auth_user import AuthUser
from src.schemas import schemas
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from src.infra.sqlalchemy.depends import token_verifier
from src.infra.providers import publisher

user_router = APIRouter(prefix='/user')
test_router = APIRouter(prefix='/test', dependencies=[Depends(token_verifier)])

@user_router.post('/register')
async def user_register(user:schemas.Register, db: Session = Depends(get_db)):
    au = AuthUser(db=db)
    au.user_register(user=user)
    publisher.publisher.send_message({
        "email": user.email,
        "username": user.username
    })
    return JSONResponse(
        content=({"msg": "User created successfully"}),
        status_code=status.HTTP_201_CREATED
    )

@user_router.post('/login')
async def user_login(request_form_user: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    uc = AuthUser(db=db)
    user = schemas.Login(
        username=request_form_user.username,
        password=request_form_user.password
    )

    auth_data = uc.user_login(user=user)
    return JSONResponse(
        content=auth_data,
        status_code=status.HTTP_200_OK
    )

@test_router.get('/test')
async def verify():
    return "working"