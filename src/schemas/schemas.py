from pydantic import BaseModel, validator
import re

class DadosUsuario(BaseModel):
    username: str
    password: str

    class Config:
        orm_mode = True