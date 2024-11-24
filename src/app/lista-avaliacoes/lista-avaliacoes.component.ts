import { ChangeDetectorRef, Component } from '@angular/core';
import { AvalicaoInterface, AvalicaoResponse } from '../../interfaces/AvaliacaoInterface';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AvaliacoesService } from '../services/avalicao.service';


@Component({
  selector: 'app-lista-avaliacoes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule],
  templateUrl: './lista-avaliacoes.component.html',
  styleUrl: './lista-avaliacoes.component.css'
})
export class ListaAvaliacoesComponent {
  avaliacoes: AvalicaoResponse[] = [];
  errorMessage: string = '';
  festaId: number = 0;
  userId: number = 0;
  constructor(
    private avaliacaoService: AvaliacoesService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('Preciso pegar o ID da festa para saber as queries');
    // Converte os parâmetros para números
    this.festaId = Number(this.route.snapshot.paramMap.get('festaId'));
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    console.log('Festa ID:', this.festaId);
    console.log('User ID:', this.userId);

    this.avaliacaoService.getAvaliacoesByFestaId(this.festaId).subscribe(
      (response: any) => {
        console.log('Resposta completa:', response); // Verificar a estrutura recebida
        if (Array.isArray(response.avaliacoes)) {
          this.avaliacoes = response.avaliacoes; // Já são os objetos esperados
          console.log('Avaliações carregadas:', this.avaliacoes);
        } else {
          console.error('O retorno não é uma lista:', response.avaliacoes);
          this.errorMessage = 'Erro ao carregar as avaliações. Resposta inválida.';
        }
      },
      (error) => {
        this.errorMessage = 'Erro ao carregar a lista de avaliações.';
        console.error(error);
      }
    );
  }

  navigateToFestas(): void {
    this.router.navigate(['/lobby']);
  }
}
