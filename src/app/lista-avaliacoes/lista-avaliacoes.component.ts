import { ChangeDetectorRef, Component } from '@angular/core';
import { AvalicaoInterface, AvalicaoResponse } from '../../interfaces/AvaliacaoInterface';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AvaliacoesService } from '../services/avalicao.service';
import { FormsModule } from '@angular/forms';
import { ComentarioResponse } from '../../interfaces/ComentarioInterface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditComentarioDialogComponent } from '../edit-comentario-dialog/edit-comentario-dialog.component';

@Component({
  selector: 'app-lista-avaliacoes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule,FormsModule,MatDialogModule],
  templateUrl: './lista-avaliacoes.component.html',
  styleUrls: ['./lista-avaliacoes.component.css']
})
export class ListaAvaliacoesComponent {
  avaliacoes: AvalicaoResponse[] = [];
  comentarios: ComentarioResponse[] = [];
  errorMessage: string = '';
  festaId: number = 0;
  userId: number = 0;
  novoComentario: string = ''; // Variável para armazenar o novo comentário

  constructor(
    private avaliacaoService: AvaliacoesService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  openEditDialog(comentario: any): void {
    const dialogRef = this.dialog.open(EditComentarioDialogComponent, {
      width: '400px',
      data: { comentario }  // Passa o comentário que será editado
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Ação após o fechamento do diálogo, como atualizar a lista de comentários
        console.log('Comentário editado com sucesso!');
      }
    });
  }

  ngOnInit(): void {
    console.log('Preciso pegar o ID da festa para saber as queries');
    // Converte os parâmetros para números
    this.festaId = Number(this.route.snapshot.paramMap.get('festaId'));
    this.userId = Number(this.route.snapshot.paramMap.get('criadorId'));
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

    this.avaliacaoService.getComentarios(this.festaId).subscribe(
      (response: any) => {
        console.log('Resposta completa:', response); // Verificar a estrutura recebida
        if (Array.isArray(response.comentarios)) {
          this.comentarios = response.comentarios; // Já são os objetos esperados
          console.log('Avaliações carregadas:', this.comentarios);
        } else {
          console.error('O retorno não é uma lista:', response.comentarios);
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

  editarAvaliacao(avaliacao: AvalicaoInterface): void {
    console.log('Passando dados para a navegação:', avaliacao);
    this.router.navigate(['/editarAvaliacao'], { state: { avaliacao } });
  }

  excluirAvaliacao(avaliacaoId: number): void {
    console.log('avaliacaoID, exclusao', avaliacaoId);
    this.avaliacaoService.excluirAvaliacao(avaliacaoId);
  }

  // Método para cadastrar um comentário
  adicionarComentario(idFesta: number): void {
    if (this.novoComentario.trim() === '') {
      alert('O comentário não pode ser vazio.');
      return;
    }

    const comentarioData = {
      id_avaliacao: idFesta, // ID da avaliação (id_festa)
      id_criador_comentario: this.userId, // ID do usuário que está comentando
      comentario: this.novoComentario, // Comentário digitado
    };
    
    this.avaliacaoService.adicionarComentario(comentarioData).subscribe(
      (response) => {
        alert('Comentário adicionado com sucesso!');
        this.novoComentario = ''; // Limpar o campo de comentário após enviar
        this.ngOnInit(); // Recarregar as avaliações com o novo comentário
      },
      (error) => {
        console.error('Erro ao adicionar comentário', error);
      }
    );
  }

  excluirComentario(comentarioId: number):void{
    this.avaliacaoService.excluirComentario(comentarioId);
  }
}
