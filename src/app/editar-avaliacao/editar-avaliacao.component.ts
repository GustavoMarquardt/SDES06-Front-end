import { AvaliacoesService } from './../services/avalicao.service';
import { Component, OnInit } from '@angular/core';
import { AvalicaoInterface } from '../../interfaces/AvaliacaoInterface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-avaliacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-avaliacao.component.html',
  styleUrls: ['./editar-avaliacao.component.css']
})
export class EditarAvaliacaoComponent implements OnInit {
  avaliacao: AvalicaoInterface | undefined;

  // Variáveis para vinculação no formulário
  organizacao: number | undefined;
  qualidade_musica: number | undefined;
  bar: number | undefined;
  atendimento: number | undefined;
  localizacao: number | undefined;
  preco: number | undefined;
  comentario: string = '';
  idAvaliacao = 0;

  constructor(private router: Router, private AvaliacoesService: AvaliacoesService) { }

  ngOnInit(): void {
    // Acessando o 'state' diretamente de window.history.state
    const state = window.history.state;

    if (state?.avaliacao) {
      this.avaliacao = state.avaliacao;
      console.log('Dados recebidos:', this.avaliacao);

      // Inicializando as variáveis com os valores da avaliação
      this.organizacao = this.avaliacao?.organizacao;
      this.qualidade_musica = this.avaliacao?.qualidade_musica;
      this.bar = this.avaliacao?.bar;
      this.atendimento = this.avaliacao?.atendimento;
      this.localizacao = this.avaliacao?.localizcao;
      this.preco = this.avaliacao?.preco;
      this.comentario = this.avaliacao?.comentario || '';
      this.idAvaliacao = this.avaliacao?.id ?? 0;
    } else {
      console.error('Nenhum dado de avaliação recebido.');
    }
  }

  // Função de envio do formulário
  cadastrar(): void {
    // Lógica de cadastro, por exemplo, enviar a avaliação atualizada para o backend
    if (this.avaliacao?.id_criador_avaliacao === undefined) {
      console.error('ID do criador da avaliação é obrigatório.');
      return;  // Ou outra lógica para interromper a operação
    }
    
    const avaliacao = {
      ...this.avaliacao,
      organizacao: this.organizacao ?? 0,   // Atribui 0 se for undefined
      qualidade_musica: this.qualidade_musica ?? 0,
      bar: this.bar ?? 0,
      atendimento: this.atendimento ?? 0,
      localizacao: this.localizacao ?? 0,
      preco: this.preco ?? 0,
      comentario: this.comentario ?? '',
    };
    
    // Enviar para o backend
    this.AvaliacoesService.atualizarAvaliacao(avaliacao);
  }

  navigateToFestas(): void {
    this.router.navigate(['/lobby']);
  }
}
