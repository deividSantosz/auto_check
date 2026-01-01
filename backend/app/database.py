from sqlmodel import create_engine, Session, SQLModel
DATABASE_URL = "postgresql://postgres:1234567@localhost:5432/autocar_db"

engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session