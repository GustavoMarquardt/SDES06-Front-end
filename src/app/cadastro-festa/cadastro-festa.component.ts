import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Importando CommonModule
import { FormsModule } from '@angular/forms';
import { FestasService } from '../services/festas.service';

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
  imagem_festa: any; 

  

  constructor(private http: HttpClient, private router: Router,  private  festaService: FestasService) { }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Converte o arquivo em base64 e atribui à variável imagem_festa
        this.imagem_festa = reader.result as string;  // A string base64
        console.log(this.imagem_festa);  // Log após a conversão
      };
      reader.readAsDataURL(file); // Lê o arquivo como URL base64
    }
  }
  
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
      id_criador: userId,
      imagem_festa: this.imagem_festa // Envia a imagem como string base64
    };
  
    // Verificando se algum campo obrigatório está vazio
    if (!this.nome_da_festa || !this.data_e_hora || !this.localizacao || !this.descricao || !this.capacidade || !this.categoria || !this.imagem_festa) {
      this.errorMessage = 'Todos os campos devem ser preenchidos.';
      return; // Interrompe a execução caso algum campo esteja vazio
    }
  
    // Definindo o cabeçalho adequado para JSON
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Usando JSON porque estamos enviando base64
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
  
  navigateToCadastroFesta(): void {
    this.router.navigate(['/cadastrarFesta']);
  }

  navigateToEdit(): void {
    console.log('BORAAAA');
    this.router.navigate(['/editarPerfil']);
  }

  navigateToLobby(): void {
    this.router.navigate(['/lobby'])
  }
}
