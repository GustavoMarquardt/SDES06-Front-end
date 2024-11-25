import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AvalicaoInterface, AvalicaoResponse } from '../../interfaces/AvaliacaoInterface'; // Importe as interfaces aqui
import { ComentarioInterface, ComentarioResponse } from '../../interfaces/ComentarioInterface';

@Injectable({
  providedIn: 'root'
})
export class AvaliacoesService {

  private apiUrl = 'http://localhost:3000/api/festas'; // URL base da API para avaliações

  constructor(private http: HttpClient, private router: Router) { }


  // Método para obter todas as avaliações
  getAllAvaliacoes(): Observable<AvalicaoResponse[]> {
    return this.http.get<AvalicaoResponse[]>(`${this.apiUrl}/listarAvaliacoes`);
  }

  // Método para obter avaliações de uma festa específica pelo ID da festa
  getAvaliacoesByFestaId(festaId: number): Observable<AvalicaoResponse[]> {
    const resposta = this.http.get<AvalicaoResponse[]>(`${this.apiUrl}/avaliacoes/festa/${festaId}`);
    console.log('Resposta bd', resposta);
    return resposta;
  }

  // Método para criar uma nova avaliação
  criarAvaliacao(avaliacao: AvalicaoInterface): void {
    this.http.post<AvalicaoResponse>('http://localhost:3000/api/festas/avaliacoes', avaliacao)
      .subscribe({
        next: (response) => {
          window.alert("Avaliacao realizada com sucesso!")
          this.router.navigate(['/login']); // Redireciona para a página de cadastro
          console.log('Resposta do backend:', response);
        },
        error: (err) => {
          console.error('Erro na requisição:', err);
        }
      });
  }
  

  atualizarAvaliacao(avaliacao: AvalicaoInterface): Observable<AvalicaoResponse> {
    console.log('id avalicao',avaliacao.id)
    const request = this.http.put<AvalicaoResponse>(`http://localhost:3000/api/festas/avaliacoes/${avaliacao.id}`, avaliacao);
    
    request.subscribe({
      next: (response) => {
        console.log('Resposta do backend:', response);
      },
      error: (error) => {
        console.error('Erro ao chamar o backend:', error);
      },
      complete: () => {
        console.log('Requisição PUT concluída.');
      }
    });
  
    return request; // Retorna o Observable
  }

  // Método para excluir uma avaliação pelo ID
  excluirAvaliacao(avaliacaoId: number): void {
    const confirmacao = window.confirm('Tem certeza de que deseja excluir esta avaliação?');
  
    if (!confirmacao) {
      // Se o usuário cancelar, interrompe o fluxo
      return;
    }
  
    console.log('Chamando DELETE com ID:', avaliacaoId);
  
    this.http.delete(`http://localhost:3000/api/festas/avaliacoes/${avaliacaoId}`).subscribe({
      next: (response) => {
        console.log('Resposta do backend:', response);
        alert('Avaliação excluída com sucesso!');
        this.ngOnInit(); // Atualize a lista de avaliações
      },
      error: (error) => {
        console.error('Erro ao chamar o backend:', error);
        alert('Erro ao excluir a avaliação. Tente novamente.');
      },
      complete: () => {
        console.log('Requisição DELETE concluída.');
      }
    });
  }
  ngOnInit() {
    throw new Error('Method not implemented.');
  }
  
    // Método para adicionar um comentário
    adicionarComentario(comentarioData: { id_avaliacao: number; id_criador_comentario: number; comentario: string }): Observable<any> {
      console.log('comentario',comentarioData)
      return this.http.post<any>(`http://localhost:3000/api/festas/comentarios`, comentarioData);
    }
  
    getComentarios(avaliacaoId: number):Observable<ComentarioResponse>{
      console.log('get comentairo',avaliacaoId)
      var res ;
      res = this.http.get<ComentarioResponse>(`http://localhost:3000/api/festas/comentarios`);
      console.log('resposta', res);
      return res;
    }

    excluirComentario(avaliacaoId: number): void {
      console.log('Chamando DELETE com ID:', avaliacaoId);
    
      this.http.delete(`http://localhost:3000/api/festas/comentarios/${avaliacaoId}`).subscribe({
        next: (response) => {
          console.log('Resposta do backend:', response);
        },
        error: (error) => {
          console.error('Erro ao chamar o backend:', error);
        },
        complete: () => {
          console.log('Requisição DELETE concluída.');
        }
      });
    }

    atualizarComentario(id: number, comentario: ComentarioInterface): Observable<ComentarioResponse> {
      console.log('Chamando PUT para atualizar o comentário:', id, comentario);
      return this.http.put<ComentarioResponse>(`${this.apiUrl}/comentarios/${id}`, comentario);
    }
    
  
}
