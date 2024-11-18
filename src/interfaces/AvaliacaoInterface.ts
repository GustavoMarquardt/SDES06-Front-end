export interface AvalicaoInterface {
    //id	id_criador_avaliacao	id_festa	organizacao	qualidade_musica	bar	atendimento	localizcao	preco	
    id_criador_avaliacao: number;
    id_festa: number;
    organizacao: number;
    qualidade_musica: number;
    id: number;
    bar: number;
    atendimento: number;
    localizcao: number;
    preco: number
}

export interface AvalicaoResponse {
    id: number; // Adicione esta linha se o ID está presente
    status: number;
    festas: AvalicaoInterface[];
}
