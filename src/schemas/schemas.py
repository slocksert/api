from pydantic import BaseModel

class Register(BaseModel):
    username: str
    password: str
    email: str | None = None

    class Config:
        orm_mode = True

class Login(BaseModel):
    username: str
    password: str

    class Config:
        orm_mode = True