import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = 'http://localhost:3000/api/festas'; // Substitua com a URL da sua API

  constructor(private http: HttpClient) { }

  // Método para pegar os dados de um usuário
  obterPerfil(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario/buscarUsuario/${userId}`);
  }

  // Método para atualizar o perfil (se necessário)
  editarPerfil(userId: string, dados: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, dados);
  }
}
