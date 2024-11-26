export interface FestaInterface {
  capacidade: number;
  categoria: string;
  data_e_hora: string;
  descricao: string;
  id: number;
  localizacao: string;
  nome_da_festa: string;
}

export interface FestaResponse {
  id: number; // Adicione esta linha se o ID está presente
  status: number;
  festas: FestaInterface[];
}
