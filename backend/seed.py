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
        "imagem_url": "https://s2-autoesporte.glbimg.com/C8DPoFEicKl_HlJ9FbPlSXw-IT4=/0x0:2200x1500/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/p/W/DKjqzoTKKYzNfeb4CzWA/corollafrente.jpg",
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
        "imagem_url": "https://revistacarro.com.br/wp-content/uploads/2019/10/Honda-Civic_2.jpg",
        "pontos_positivos": "Performance do motor turbo, estabilidade em curvas e design esportivo.",
        "pontos_negativos": "Frente muito baixa (raspa em lombadas), ausência de sensor dianteiro.",
        "problemas_cronicos": "Barulhos na caixa de direção e condensador do ar-condicionado frágil.",
        "consumo_cidade": 11.8,
        "consumo_estrada": 14.4,
        "custo_manutencao": "Alto",
        "motorizacao": "1.5 Turbo 173cv",
        "cambio": "CVT",
        "dica_especialista": "O motor turbo exige gasolina de boa qualidade (preferência Aditivada ou Premium) para evitar carbonização."
    },
    {
        "marca": "Volkswagen",
        "modelo": "Golf Highline 1.4 TSI",
        "ano": 2015,
        "preco_fipe": 85000.0,
        "imagem_url": "https://s3-sa-east-1.amazonaws.com/revresources/sevenn-multimarcas/imagens_veiculos/640_480_folhacar_volkswagen-golf-1-4-tsi-bluemotion-tech-dsg-highline-14-15-f81c77-18.jpg",
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
        "imagem_url": "https://s2-autoesporte.glbimg.com/ErwdxTvVnux8ue4h9FTsH7UWPUM=/0x0:1980x1136/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/F/a/X04D4jQ82RrxN6nnBZSw/novo-hb20-5.jpg",
        "pontos_positivos": "Garantia de 5 anos, visual moderno e baixo custo de peças.",
        "pontos_negativos": "Espaço traseiro apertado e suspensão um pouco rígida.",
        "problemas_cronicos": "Tremedeira na embreagem e barulhos nos vidros elétricos.",
        "consumo_cidade": 12.8,
        "consumo_estrada": 14.6,
        "custo_manutencao": "Baixo",
        "motorizacao": "1.0 Kappa Flex 80cv",
        "cambio": "Manual de 5 marchas",
        "dica_especialista": "Excelente para uso urbano. Verifique se as revisões de 10k e 20k foram feitas para manter a garantia."
    },
    {
        "marca": "Chevrolet",
        "modelo": "Onix Plus Premier 1.0T",
        "ano": 2021,
        "preco_fipe": 88000.0,
        "imagem_url": "https://fotos-jornaldocarro-estadao.akamaized.net/uploads/2019/11/25134707/onix-plus-8-1160x773.jpg",
        "pontos_positivos": "Tecnologia embarcada (Wi-Fi), economia de combustível e segurança (6 airbags).",
        "pontos_negativos": "Acabamento interno com muito plástico rígido e faróis halógenos simples.",
        "problemas_cronicos": "Correia dentada banhada a óleo exige manutenção rigorosa para não romper.",
        "consumo_cidade": 12.0,
        "consumo_estrada": 15.0,
        "custo_manutencao": "Médio",
        "motorizacao": "1.0 Turbo 116cv",
        "cambio": "Automático de 6 marchas",
        "dica_especialista": "Use apenas o óleo especificado no manual. O óleo errado destrói a correia dentada precocemente."
    },
    {
        "marca": "Jeep",
        "modelo": "Compass Longitude 2.0 Flex",
        "ano": 2019,
        "preco_fipe": 105000.0,
        "imagem_url": "https://images.noticiasautomotivas.com.br/img/f/jeep-compass-longitude-2019-1.jpg",
        "pontos_positivos": "Presença imponente, acabamento interno soft-touch e ótima revenda.",
        "pontos_negativos": "Consumo de combustível elevado e porta-malas pequeno para um SUV.",
        "problemas_cronicos": "Trocador de calor do câmbio pode falhar e misturar óleo na água.",
        "consumo_cidade": 8.8,
        "consumo_estrada": 10.8,
        "custo_manutencao": "Alto",
        "motorizacao": "2.0 Tigershark 166cv",
        "cambio": "Automático de 6 marchas",
        "dica_especialista": "Instale um trocador de calor externo ou faça a limpeza preventiva do sistema de arrefecimento anualmente."
    },
    {
        "marca": "Fiat",
        "modelo": "Argo Drive 1.3",
        "ano": 2020,
        "preco_fipe": 63000.0,
        "imagem_url": "https://images.noticiasautomotivas.com.br/img/f/fiat-argo-drive-1.3-2020-1.jpg",
        "pontos_positivos": "Motor Firefly econômico e forte, suspensão macia para buracos.",
        "pontos_negativos": "Direção elétrica muito leve em alta velocidade e isolamento acústico simples.",
        "problemas_cronicos": "Vazamento na tampa de válvulas e sensores do ABS sensíveis.",
        "consumo_cidade": 12.5,
        "consumo_estrada": 14.5,
        "custo_manutencao": "Baixo",
        "motorizacao": "1.3 Firefly 109cv",
        "cambio": "Manual de 5 marchas",
        "dica_especialista": "Um dos melhores motores para quem busca baixo custo. Ótimo torque em baixas rotações."
    },
    {
        "marca": "Renault",
        "modelo": "Sandero Stepway 1.6",
        "ano": 2018,
        "preco_fipe": 58000.0,
        "imagem_url": "https://images.noticiasautomotivas.com.br/img/f/renault-sandero-stepway-2018-1.jpg",
        "pontos_positivos": "Espaço interno imbatível no segmento e robustez da suspensão elevada.",
        "pontos_negativos": "Posição de dirigir ergonômica limitada e acabamento simples.",
        "problemas_cronicos": "Barulhos internos nos painéis de porta e desgaste prematuro das buchas da bandeja.",
        "consumo_cidade": 10.5,
        "consumo_estrada": 12.0,
        "custo_manutencao": "Baixo",
        "motorizacao": "1.6 SCe 118cv",
        "cambio": "Manual de 5 marchas",
        "dica_especialista": "Ideal para quem encara estradas de terra leves. Mecânica muito robusta e peças baratas."
    },
    {
        "marca": "Ford",
        "modelo": "Ka SE 1.0",
        "ano": 2019,
        "preco_fipe": 52000.0,
        "imagem_url": "https://images.noticiasautomotivas.com.br/img/f/ford-ka-2019-1.jpg",
        "pontos_positivos": "Motor 3 cilindros esperto e excelente acerto de direção (direta e prazerosa).",
        "pontos_negativos": "Desvalorização após a Ford sair do Brasil e porta-malas minúsculo.",
        "problemas_cronicos": "Superaquecimento por falha na carcaça da válvula termostática (plástico).",
        "consumo_cidade": 13.0,
        "consumo_estrada": 15.1,
        "custo_manutencao": "Médio",
        "motorizacao": "1.0 Ti-VCT 85cv",
        "cambio": "Manual de 5 marchas",
        "dica_especialista": "Troque a carcaça da válvula termostática por uma de alumínio assim que puder para evitar quebras."
    },
    {
        "marca": "Nissan",
        "modelo": "Kicks SL 1.6",
        "ano": 2019,
        "preco_fipe": 92000.0,
        "imagem_url": "https://images.noticiasautomotivas.com.br/img/f/nissan-kicks-sl-2019-1.jpg",
        "pontos_positivos": "Bancos Gravidade Zero muito confortáveis, visão 360º e leveza na condução.",
        "pontos_negativos": "Motor 1.6 é apenas 'justo' (falta fôlego em subidas carregado).",
        "problemas_cronicos": "Barulho estrutural na coluna B e fragilidade no suporte do motor.",
        "consumo_cidade": 11.4,
        "consumo_estrada": 13.7,
        "custo_manutencao": "Médio",
        "motorizacao": "1.6 16V 114cv",
        "cambio": "CVT",
        "dica_especialista": "Foque na troca do fluido do câmbio CVT a cada 60.000km, mesmo que o manual diga que não precisa."
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