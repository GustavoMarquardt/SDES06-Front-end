import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Importando HttpClientModule
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {LoginResponse} from '../../../interfaces/LoginResponse';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule], // Certifique-se de importar o HttpClientModule aqui
  standalone: true
})
export class LoginComponent {
  nome_completo: string = '';
  email: string = '';
  senha: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient, // Injetando o HttpClient
    private router: Router
  ) { }

  login() {
    const login = {
      email: this.email,
      senha: this.senha,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Caso precise de um cabeçalho específico
    });
    console.log(login)
    // Fazendo a requisição POST para a API
    this.http.post<LoginResponse>('http://localhost:3000/api/festas/usuario/loginUsuario', login, { headers })
      .subscribe({
        next: (res: LoginResponse) => {
          // Armazena o id do usuário em uma variável ou no sessionStorage/localStorage
          console.log('MEU PIRU GIGANTE')
          sessionStorage.setItem('userId', res.usuario.id.toString());
          sessionStorage.setItem('userName', res.usuario.nome_completo);
          // Verifica se os dados foram salvos corretamente
          console.log('User ID saved in sessionStorage:', sessionStorage.getItem('userId'));
          console.log('User Name saved in sessionStorage:', sessionStorage.getItem('userName'));
          this.router.navigate(['lobby']);
        },
        error: (error: HttpErrorResponse) => {
          // Erro: Trata o erro da requisição e exibe uma mensagem apropriada
          if (error.status === 400) {
            const mensagemErro = error.error?.mensagem || 'Erro desconhecido';
            console.error('Erro:', mensagemErro);
            this.errorMessage = mensagemErro;  // Atribui a mensagem de erro
          } else {
            this.errorMessage = 'Email ou senha incorretos';
            console.error('Erro inesperado:', error);
          }

          console.log("Erro de login:", this.errorMessage);  // Adicionando log para verificação
        }
      });
  }

  navigateToRegister() {
    console.log('navegando para tela de cadastro');
    this.router.navigate(['/cadastrarUsuario']); // Redireciona para a página de cadastro
  }
}
