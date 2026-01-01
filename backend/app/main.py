from fastapi import FastAPI
from app.database import create_db_and_tables
from app.models.car import Car as Car_model
from app.routers import car_router as Car_controller    
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(titile = "AutoCAR API")
app.include_router(Car_controller.router)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",  # Adicione esta linha
    "http://127.0.0.1:5174",  # Adicione esta linha também por segurança
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)
@app.on_event("startup")
def on_startup():
    print("Iniciando a criação das tabelas...")
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"message": "AutoCheck API is running!"}