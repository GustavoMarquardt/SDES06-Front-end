import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvaliacoesService } from '../services/avalicao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AvalicaoInterface } from '../../interfaces/AvaliacaoInterface';

@Component({
  selector: 'app-comentarios-avaliacoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comentarios-avaliacoes.component.html',
  styleUrl: './comentarios-avaliacoes.component.css',
})
export class ComentariosAvaliacoesComponent {
  organizacao: number = 0;
  qualidade_musica: number = 0;
  bar: number = 0;
  atendimento: number = 0;
  localizacao: number = 0;
  preco: number = 0;
  comentario: string = '';
  festaId: string = '';
  criadorFestaId: string = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private avaliacaoService: AvaliacoesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.festaId = params.get('festaId') || ''; // Recupera o valor de festaId
      this.criadorFestaId = params.get('userId') || ''; // Recupera o valor de userId
      console.log('Festa ID recuperado:', this.festaId);

    });

    const criadorFestaId = sessionStorage.getItem('userId'); // Retorna o valor ou `null` se não estiver definido
    console.log('User ID:', criadorFestaId);

    if (criadorFestaId) {
      console.log('MINHA PIA GIGANTESCA', criadorFestaId);
      this.criadorFestaId = criadorFestaId;
    } else {
      console.error('User ID não encontrado no sessionStorage');
    }
  }

  // Definindo explicitamente o tipo de 'field' que será usado no método
  setRating(
    field:
      | 'organizacao'
      | 'qualidade_musica'
      | 'bar'
      | 'atendimento'
      | 'localizacao'
      | 'preco',
    rating: number
  ) {
    this[field] = rating;
    console.log(rating);
  }

  cadastrar(): void {
    console.log({
      id_criador_avaliacao: this.criadorFestaId,
      id_festa: this.festaId,
      organizacao: this.organizacao,
      qualidade_musica: this.qualidade_musica,
      bar: this.bar,
      atendimento: this.atendimento,
      localizacao: this.localizacao,
      preco: this.preco,
      comentario: this.comentario,
    });
    
    const avaliacao: AvalicaoInterface = {
      id_criador_avaliacao: Number(this.criadorFestaId),
      id_festa: Number(this.festaId),
      organizacao: this.organizacao,
      qualidade_musica: this.qualidade_musica,
      bar: this.bar,
      atendimento: this.atendimento,
      localizcao: this.localizacao,
      preco: this.preco,
    };

    this.avaliacaoService.criarAvaliacao(avaliacao);
  }

  navigateToFestas(): void {
    this.router.navigate(['/lobby']);
  }
}
