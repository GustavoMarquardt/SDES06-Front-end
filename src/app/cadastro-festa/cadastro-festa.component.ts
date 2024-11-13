import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Importando CommonModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-festa',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // Importando o HttpClientModule aqui
  templateUrl: './cadastro-festa.component.html',
  styleUrls: ['./cadastro-festa.component.css']
})
export class CadastroFestaComponent {
  nome_da_festa: string = '';
  data_e_hora: string = '';
  localizacao: string = '';
  descricao: string = '';
  capacidade: number = 0;
  categoria: string = '';
  errorMessage: string = '';


  constructor(private http: HttpClient, private router: Router) { }

  cadastrar() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.error('User ID não encontrado no sessionStorage');
    }
    const evento = {
      nome_da_festa: this.nome_da_festa,
      data_e_hora: this.data_e_hora,
      localizacao: this.localizacao,
      descricao: this.descricao,
      capacidade: this.capacidade,
      categoria: this.categoria,
      id_criador: userId
    };

    // Verificando se algum campo obrigatório está vazio
    if (!this.nome_da_festa || !this.data_e_hora || !this.localizacao || !this.descricao || !this.capacidade || !this.categoria) {
      this.errorMessage = 'Todos os campos devem ser preenchidos.';
      return; // Interrompe a execução caso algum campo esteja vazio
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post('http://localhost:3000/api/festas/cadastrarFesta', evento, { headers })
      .subscribe({
        next: (res) => {
          this.router.navigate(['/lobby']); // Navega para outra página após sucesso
        },
        error: (error) => {
          if (error.status === 400) {
            this.errorMessage = error.error?.mensagem || 'Erro desconhecido';
          }
        }
      });
  }
}
