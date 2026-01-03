from fastapi import APIRouter, Depends, Query, Path, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.services.car_service import CarService
from typing import List
from app.models.car import Car

router = APIRouter(prefix="/cars", tags=["Cars"])

@router.get("/", response_model=List[Car])
def list_cars(
    name: str = Query(None), 
    session: Session = Depends(get_session)
):
    service = CarService(session)
    return service.get_all_cars(name=name)

@router.get("/{id}", response_model=Car)
def list_car_by_id(
    id: int = Path(...),
    session: Session = Depends(get_session)
):
    service = CarService(session)
    car = service.get_by_id(id=id)
    if not car:
        raise HTTPException(status_code=404, detail="Carro não encontrado")
    return car 
