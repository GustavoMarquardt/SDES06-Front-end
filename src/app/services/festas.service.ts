// No arquivo 'festas.service.ts'

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestaResponse } from '../../interfaces/FestaInterface'; // Importe a interface aqui

@Injectable({
  providedIn: 'root'
})
export class FestasService {

  private apiUrl = 'http://localhost:3000/api/festas'; // URL da API para obter as festas

  constructor(private http: HttpClient) { }

  // Método para obter a lista de festas
  getAllFestas(): Observable<FestaResponse> {
    var res;
    res = this.http.get<FestaResponse>(`${this.apiUrl}/listarFestas`); // Usa a interface importada
    console.log(res);
    return res;
  }


  excluirFesta(festaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/excluirFesta/${festaId}`);
  }

  atualizarFesta(festa: FestaResponse): Observable<FestaResponse> {
    return this.http.put<FestaResponse>(`${this.apiUrl}/atualizarFesta/${festa.id}`, festa);
  }

  getFestaCriador(id: number): Observable<FestaResponse> {
    return this.http.get<FestaResponse>(`${this.apiUrl}/listarFestaCriador/${id}`);
  }


}
