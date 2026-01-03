from sqlmodel import Session, select
from app.database import engine
from app.models.car import Car

def seed_cars():
    cars_to_add = [
    {
        "marca": "Toyota",
        "modelo": "Corolla XEi 2.0",
        "ano": 2021,
        "preco_fipe": 125000.0,
        # Agora como uma lista de URLs
        "imagens_url": [
            "https://s2-autoesporte.glbimg.com/C8DPoFEicKl_HlJ9FbPlSXw-IT4=/0x0:2200x1500/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/p/W/DKjqzoTKKYzNfeb4CzWA/corollafrente.jpg",
            "https://quatrorodas.abril.com.br/wp-content/uploads/2019/09/toyota-corolla-2020-xei-12.jpg",
            "https://quatrorodas.abril.com.br/wp-content/uploads/2019/09/toyota-corolla-2020-xei-15.jpg"
        ],
        "pontos_positivos": "Extremo conforto, revenda muito rápida, confiabilidade mecânica lendária e excelente espaço interno.",
        "pontos_negativos": "Design conservador, central multimídia lenta e seguro costuma ser elevado.",
        "problemas_cronicos": "Ruídos na coluna de direção e infiltração nos faróis em algumas unidades.",
        "consumo_cidade": 10.6,
        "consumo_estrada": 13.9,
        "custo_manutencao": "Médio",
        "motorizacao": "2.0 Dynamic Force 177cv",
        "cambio": "CVT de 10 marchas",
        "dica_especialista": "A manutenção é simples, mas exige óleo 0W20 sintético. Verifique sempre o histórico de revisões."
    },
    {
        "marca": "Honda",
        "modelo": "Civic Touring 1.5 Turbo",
        "ano": 2020,
        "preco_fipe": 142000.0,
        "imagens_url": ["https://revistacarro.com.br/wp-content/uploads/2019/10/Honda-Civic_2.jpg"],
        "pontos_positivos": "Performance do motor turbo, estabilidade em curvas e design esportivo.",
        "pontos_negativos": "Frente muito baixa (raspa em lombadas), ausência de sensor dianteiro.",
        "problemas_cronicos": "Barulhos na caixa de direção e condensador do ar-condicionado frágil.",
        "consumo_cidade": 11.8,
        "consumo_estrada": 14.4,
        "custo_manutencao": "Alto",
        "motorizacao": "1.5 Turbo 173cv",
        "cambio": "CVT",
        "dica_especialista": "O motor turbo exige gasolina de boa qualidade para evitar carbonização."
    },
    {
        "marca": "Volkswagen",
        "modelo": "Golf Highline 1.4 TSI",
        "ano": 2015,
        "preco_fipe": 85000.0,
        "imagens_url": ["https://s3-sa-east-1.amazonaws.com/revresources/sevenn-multimarcas/imagens_veiculos/640_480_folhacar_volkswagen-golf-1-4-tsi-bluemotion-tech-dsg-highline-14-15-f81c77-18.jpg"],
        "pontos_positivos": "Melhor dirigibilidade da categoria, acabamento premium e motor muito eficiente.",
        "pontos_negativos": "Manutenção cara e seguro proibitivo para perfil jovem.",
        "problemas_cronicos": "Mecatrônica do câmbio DSG7 e ruídos na suspensão traseira.",
        "consumo_cidade": 10.2,
        "consumo_estrada": 13.5,
        "custo_manutencao": "Alto",
        "motorizacao": "1.4 TSI Turbo 140cv",
        "cambio": "Automático DSG 7 marchas",
        "dica_especialista": "Nunca compre sem testar o câmbio a frio. Verifique se houve recall da mecatrônica."
    },
    {
        "marca": "Hyundai",
        "modelo": "HB20 Comfort Plus 1.0",
        "ano": 2022,
        "preco_fipe": 72000.0,
        "imagens_url": ["https://s2-autoesporte.glbimg.com/ErwdxTvVnux8ue4h9FTsH7UWPUM=/0x0:1980x1136/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/F/a/X04D4jQ82RrxN6nnBZSw/novo-hb20-5.jpg"],
        "pontos_positivos": "Garantia de 5 anos, visual moderno e baixo custo de peças.",
        "pontos_negativos": "Espaço traseiro apertado e suspensão um pouco rígida.",
        "problemas_cronicos": "Tremedeira na embreagem e barulhos nos vidros elétricos.",
        "consumo_cidade": 12.8,
        "consumo_estrada": 14.6,
        "custo_manutencao": "Baixo",
        "motorizacao": "1.0 Kappa Flex 80cv",
        "cambio": "Manual de 5 marchas",
        "dica_especialista": "Excelente para uso urbano. Verifique as revisões para manter a garantia."
    },
    {
        "marca": "Chevrolet",
        "modelo": "Onix Plus Premier 1.0T",
        "ano": 2021,
        "preco_fipe": 88000.0,
        "imagens_url": ["https://fotos-jornaldocarro-estadao.akamaized.net/uploads/2019/11/25134707/onix-plus-8-1160x773.jpg"],
        "pontos_positivos": "Tecnologia embarcada (Wi-Fi), economia de combustível e segurança.",
        "pontos_negativos": "Acabamento interno com muito plástico rígido.",
        "problemas_cronicos": "Correia dentada banhada a óleo exige manutenção rigorosa.",
        "consumo_cidade": 12.0,
        "consumo_estrada": 15.0,
        "custo_manutencao": "Médio",
        "motorizacao": "1.0 Turbo 116cv",
        "cambio": "Automático de 6 marchas",
        "dica_especialista": "Use apenas o óleo especificado. O óleo errado destrói a correia."
    }
]
    with Session(engine) as session:
        for data in cars_to_add:
            statement = select(Car).where(Car.modelo == data["modelo"], Car.ano == data["ano"])
            existing_car = session.exec(statement).first()

            if not existing_car:
                car = Car(**data)
                session.add(car)
                print(f"✅ Adicionando: {data['marca']} {data['modelo']}")
            else:
                print(f"⏩ Pulando (já existe): {data['marca']} {data['modelo']}")
        
        session.commit()
        print("\n🚀 Seed finalizado com sucesso!")

if __name__ == "__main__":
    seed_cars()