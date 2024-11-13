import { Component } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http'; // Importando o HttpClient
import { HttpHeaders } from '@angular/common/http'; // Para definir cabeçalhos se necessário
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent {
  nome_completo: string = '';
  email: string = '';
  senha: string = '';
  data_nascimento: string = '';
  idade: number = 0;
  endereco: string = '';
  login_academico: string = '';
  rede_social: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient, // Injetando o HttpClient
    private router: Router
  ) {}

  cadastrar() {
    const usuario = {
      nome_completo: this.nome_completo,
      email: this.email,
      senha: this.senha,
      data_nascimento: this.data_nascimento,
      idade: this.idade,
      endereco: this.endereco,
      login_academico: this.login_academico,
      rede_social: this.rede_social
    };

    // Configurando cabeçalhos, se necessário
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Caso precise de um cabeçalho específico
    });

    // Fazendo a requisição POST para a API
    this.http.post('http://localhost:3000/api/festas/usuario/cadastrarUsuario', usuario, { headers })
    .subscribe({
      next: (res) => {
        this.router.navigate(['/login']); // Redireciona para a página de cadastro
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          const mensagemErro = error.error?.mensagem || 'Erro desconhecido';
          console.error('Erro:', mensagemErro);
          // Aqui você pode exibir a mensagem de erro para o usuário, por exemplo, armazenando-a em uma variável
          this.errorMessage = mensagemErro;
        }
      }
    });
  }
}
