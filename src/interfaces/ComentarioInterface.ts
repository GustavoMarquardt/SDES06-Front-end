export interface ComentarioInterface {
    id: number;
    id_criador_comentario: number;
    id_avaliacao: number;
    comentario: string
}


export interface ComentarioResponse {
    id: number; // Adicione esta linha se o ID está presente
    status: String;
    comentarios: ComentarioInterface[];
}