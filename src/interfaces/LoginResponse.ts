interface Usuario {
  id: number;
  email: string;
  nome_completo: string;
  rede_social?: string;  // A propriedade 'rede_social' é opcional
}

export interface LoginResponse {
  status: number;
  mensagem: string;
  usuario: Usuario;  // A chave 'usuario' agora é definida corretamente
}