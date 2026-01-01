from sqlmodel import SQLModel, Field
from typing import Optional

class Car(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    marca: str
    modelo: str
    ano: int
    preco_fipe: float
    imagem_url: str
    pontos_positivos: str
    pontos_negativos: str
    problemas_cronicos: str
    consumo_cidade: Optional[float] = None
    consumo_estrada: Optional[float] = None
    custo_manutencao: Optional[str] = None
    dica_especialista: Optional[str] = None
    motorizacao: Optional[str] = None 
    cambio: Optional[str] = None 