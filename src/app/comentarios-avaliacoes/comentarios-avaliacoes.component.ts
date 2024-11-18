import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AvaliacoesService} from '../services/avalicao.service'
@Component({
  selector: 'app-comentarios-avaliacoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comentarios-avaliacoes.component.html',
  styleUrl: './comentarios-avaliacoes.component.css'
})
export class ComentariosAvaliacoesComponent {
  organizacao: number = 0;
  qualidade_musica: number = 0;
  bar: number = 0;
  atendimento: number = 0;
  localizacao: number = 0;
  preco: number = 0;
  comentario: string = '';

  // Definindo explicitamente o tipo de 'field' que será usado no método
  setRating(field: 'organizacao' | 'qualidade_musica' | 'bar' | 'atendimento' | 'localizacao' | 'preco', rating: number) {
    this[field] = rating;
    console.log(rating);
  }

  cadastrar(): void {
    // Aqui você pode adicionar a lógica para processar o cadastro
    console.log({
      organizacao: this.organizacao,
      qualidade_musica: this.qualidade_musica,
      bar: this.bar,
      atendimento: this.atendimento,
      localizacao: this.localizacao,
      preco: this.preco,
      comentario:  this.comentario
    });
    
  }
}
