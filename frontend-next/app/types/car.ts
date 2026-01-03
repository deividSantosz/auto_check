export interface Car {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  preco_fipe: number;
  imagens_url: string[];
  pontos_positivos: string;
  pontos_negativos: string;
  problemas_cronicos: string;
  consumo_cidade?: number;
  consumo_estrada?: number;
  custo_manutencao?: string;
  dica_especialista?: string;
  motorizacao?: string;
  cambio?: string;
}