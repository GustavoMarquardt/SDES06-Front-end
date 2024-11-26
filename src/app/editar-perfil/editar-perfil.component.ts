import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
  standalone: true, // Definindo o componente como standalone
  imports: [CommonModule, FormsModule], // Importando os módulos necessários
})

export class EditarPerfilComponent implements OnInit {
  nome_completo: string = '';
  senha: string = '';
  rede_social: string = '';
  errorMessage: string = ''; // Mensagem de erro, se houver
  userId: string = ''; // Variável para armazenar o userId

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef,     private router: Router) {}

  ngOnInit(): void {
    // Obtém o userId do sessionStorage
    this.userId = sessionStorage.getItem('userId') || '';
    console.log('userId:', this.userId);
    
    // Verifica se o userId existe e faz a requisição para buscar os dados do usuário
    if (this.userId) {
      this.buscarDadosUsuario();
    } else {
      this.errorMessage = 'User ID não encontrado.';
    }
  }

  // Função para buscar os dados do usuário a partir da API
  buscarDadosUsuario() {
    const url = `http://localhost:3000/api/festas/usuario/buscarUsuario/${this.userId}`;
    
    this.http.get<any>(url).subscribe(
      (res) => {
        if (res && res.dados) {
          this.nome_completo = res.dados.nome_completo;
          this.senha = res.dados.senha;
          this.rede_social = res.dados.rede_social;
  
          // Força a detecção de mudanças na UI
          this.cdr.detectChanges();
        } else {
          this.errorMessage = 'Usuário não encontrado.';
        }
      },
      (error) => {
        console.error('Erro ao buscar os dados do usuário:', error);
        this.errorMessage = 'Erro ao carregar os dados do usuário.';
      }
    );
  }

  editar() {
    // Verifica se o nome completo e senha foram preenchidos
    if (this.nome_completo && this.senha) {
  
      // Verifica se a senha tem menos de 8 caracteres
      if (this.senha.length < 8) {
        this.errorMessage = 'Por favor, coloque uma senha maior do que 8 caracteres';
        return; // Interrompe a execução aqui se a senha for inválida
      }
  
      // Se tudo estiver certo, faz o log dos dados editados
      console.log('Dados editados com sucesso!', {
        nome_completo: this.nome_completo,
        senha: this.senha,
        rede_social: this.rede_social,
      });
  
      // Limpa a mensagem de erro caso os dados estejam corretos
      this.errorMessage = '';
      this.router.navigate(['/lobby']);
    } else {
      // Caso algum campo obrigatório não tenha sido preenchido
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
    }
  }

  navigateToCadastroFesta(): void {
    this.router.navigate(['/cadastrarFesta']);
  }

  navigateToLogout(): void {
    this.router.navigate(['/']);
  }

  navigateToEdit():void{
    this.router.navigate(['/editarPerfil']);
  }

  navigateToFestas(): void {
    this.router.navigate(['/lobby'])
  }

  navigateToRelatorio(): void {
    this.router.navigate(['/gerarRelatorio'])
  }
}
