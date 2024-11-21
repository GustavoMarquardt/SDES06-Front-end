import { ChangeDetectorRef, Component } from '@angular/core';
import { FestaInterface, FestaResponse } from '../../interfaces/FestaInterface';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FestasService } from '../services/festas.service';
import { HttpClient } from '@angular/common/http';
import { AvalicaoResponse } from '../../interfaces/AvaliacaoInterface';

import { AvaliacoesService } from '../services/avalicao.service';

@Component({
  selector: 'app-lista-festas',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule],
  templateUrl: './lista-festas.component.html',
  styleUrls: ['./lista-festas.component.css'],
})
export class ListaFestasComponent {
  festas: FestaResponse[] = [];
  avaliacoes: AvalicaoResponse[] = []; // Dados das avaliações
  selectedFestaId: string | null = null;
  showAvaliarForm: boolean = false; // Controle para exibir o formulário de avaliação
  errorMessage: string = '';

  constructor(
    private festasService: FestasService,
    private router: Router,
    private http: HttpClient,
    private avaliacoesService: AvaliacoesService,
    private cdRef: ChangeDetectorRef
  ) {
    
  }

  ngOnInit(): void {
    // Carrega as festas
    this.festasService.getAllFestas().subscribe(
      (response: any) => {
        // Verifica se response.festas é um array
        if (Array.isArray(response.festas)) {
          this.festas = response.festas.map((festa: any) => {
            if (festa.imagem_festa && festa.imagem_festa.data) {
              const blob = this.convertBufferToBlob(festa.imagem_festa);
              festa.imagem_festa = URL.createObjectURL(blob);
            }
            return festa;
          });
        } else {
          console.error('O retorno não é uma lista:', response.festas);
          this.errorMessage = 'Erro ao carregar as festas. Resposta inválida.';
        }
      },
      (error) => {
        this.errorMessage = 'Erro ao carregar a lista de festas.';
        console.error(error);
      }
    );
  }

  // Função para abrir o formulário de avaliação (exibindo diretamente na tela)
  openAvaliarDialog(festaId: string) {
    console.log('Abrindo formulário de avaliação para a festa:', festaId);
    this.selectedFestaId = festaId;
    this.showAvaliarForm = true; // Exibe o formulário

    // Carrega as avaliações para a festa selecionada
    this.loadAvaliacoes(festaId);
  }

  // Função para carregar as avaliações da festa
  private loadAvaliacoes(festaId: string) {
    this.avaliacoesService.getAvaliacoesByFestaId(+festaId).subscribe({
      next: (data) => {
        this.avaliacoes = data; // Dados das avaliações carregados
        console.log('Avaliações carregadas:', this.avaliacoes);
      },
      error: (err) => {
        console.error('Erro ao carregar as avaliações:', err);
      },
    });
  }

  // Função para converter o buffer de imagem em Blob
  convertBufferToBlob(buffer: any): Blob {
    const byteArray = new Uint8Array(buffer.data); // Converte o Buffer para um Array de bytes
    return new Blob([byteArray], { type: 'image/jpeg' }); // Cria o Blob
  }

  // Função para fechar o formulário de avaliação
  closeAvaliarForm() {
    this.showAvaliarForm = false; // Fecha o formulário
    this.selectedFestaId = null;
    this.avaliacoes = []; // Limpa as avaliações
  }

  // Função para gerar as estrelas de avaliação
  generateStars(rating: number): string {
    const totalStars = 5; // Número total de estrelas
    const fullStars = '★'.repeat(rating); // Estrelas preenchidas
    const emptyStars = '☆'.repeat(totalStars - rating); // Estrelas vazias
    return fullStars + emptyStars;
  }

  // Navegação para outros componentes
  navigateToCadastroFesta(): void {
    this.router.navigate(['/cadastrarFesta']);
  }

  navigateToEdit(): void {
    this.router.navigate(['/editarPerfil']);
  }

  navigateToListarFestas(): void {
    this.router.navigate(['/listarFestas']);
  }

  navigateToMinhasFestas(): void {
    this.router.navigate(['/lobby']);
  }

  // Dentro de ListaFestasComponent
  navigateToAvaliarFesta(festaId: string): void {
    const userId = sessionStorage.getItem('userId');
    console.log('opssss',userId);
    this.router.navigate([`avaliar/${festaId}/${userId}`]);
  }

  navigateToAvaliacoesFesta(festaId: string): void {
    const userId = sessionStorage.getItem('userId');
    console.log('opssss',userId);
    this.router.navigate([`avaliacoes/${festaId}/${userId}`]);
  }
  
  navigateToFestas(): void {
    this.router.navigate(['/lobby']);
  }
}
