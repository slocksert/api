from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import user_routes

app = FastAPI()

origins = ['http://localhost:8000/public/login.html','http://localhost:5500','http://127.0.0.1:5500','http://localhost:5500/public/login.html']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(user_routes.user_router)
app.include_router(user_routes.test_router)
