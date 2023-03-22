from sqlalchemy import Column, Integer, String
from src.infra.sqlalchemy.config.database import Base

class Dados(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(16), nullable=False, unique=True)
    password = Column(String(150), nullable=False)
