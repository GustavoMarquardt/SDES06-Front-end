import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvalicaoInterface, AvalicaoResponse } from '../../interfaces/AvaliacaoInterface'; // Importe as interfaces aqui

@Injectable({
  providedIn: 'root'
})
export class AvaliacoesService {

  private apiUrl = 'http://localhost:3000/api/festas'; // URL base da API para avaliações

  constructor(private http: HttpClient) { }

  // Método para obter todas as avaliações
  getAllAvaliacoes(): Observable<AvalicaoResponse[]> {
    return this.http.get<AvalicaoResponse[]>(`${this.apiUrl}/listarAvaliacoes`);
  }

  // Método para obter avaliações de uma festa específica pelo ID da festa
  getAvaliacoesByFestaId(festaId: number): Observable<AvalicaoResponse[]> {
    return this.http.get<AvalicaoResponse[]>(`${this.apiUrl}/avaliacoes/festa/${festaId}`);
  }

  // Método para criar uma nova avaliação
  criarAvaliacao(avaliacao: AvalicaoInterface): void {
    this.http.post<AvalicaoResponse>('http://localhost:3000/api/festas/avaliacoes', avaliacao)
      .subscribe({
        next: (response) => {
          console.log('Resposta do backend:', response);
        },
        error: (err) => {
          console.error('Erro na requisição:', err);
        }
      });
  }
  

  // Método para atualizar uma avaliação pelo ID
  atualizarAvaliacao(avaliacao: AvalicaoInterface): Observable<AvalicaoResponse> {
    return this.http.put<AvalicaoResponse>(`http://localhost:3000/api/festas/avaliacoes`, avaliacao);
  }

  // Método para excluir uma avaliação pelo ID
  excluirAvaliacao(avaliacaoId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/api/festas/avaliacoes`);
  }
}
