from sqlmodel import Session, select
from app.models.car import Car

class CarService:
    def __init__(self, session: Session):
        self.session = session

    def get_all_cars(self, name: str = None):
        statement = select(Car)
        if name:
            statement = statement.where(Car.modelo.ilike(f"%{name}%"))
        
        return self.session.exec(statement).all()
    
    def get_by_id(self, id: int):
        return self.session.get(Car, id)