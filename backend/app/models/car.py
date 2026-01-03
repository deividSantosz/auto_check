from typing import List, Optional
from sqlmodel import SQLModel, Field, Column, String
from sqlalchemy.dialects.postgresql import ARRAY

class Car(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    marca: str
    modelo: str
    ano: int
    preco_fipe: float
    imagens_url: List[str] = Field(sa_column=Column(ARRAY(String)))
    pontos_positivos: str
    pontos_negativos: str
    problemas_cronicos: str
    consumo_cidade: Optional[float] = None
    consumo_estrada: Optional[float] = None
    custo_manutencao: Optional[str] = None
    dica_especialista: Optional[str] = None
    motorizacao: Optional[str] = None 
    cambio: Optional[str] = None 