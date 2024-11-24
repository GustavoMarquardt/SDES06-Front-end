import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http'; 
import { ComentarioInterface, ComentarioResponse } from '../../interfaces/ComentarioInterface';
import { AvaliacoesService } from '../services/avalicao.service';

@Component({
  selector: 'app-edit-comentario-dialog',
  templateUrl: './edit-comentario-dialog.component.html',
  styleUrls: ['./edit-comentario-dialog.component.css'],
})
export class EditComentarioDialogComponent {
  comentario: ComentarioInterface;
  novoComentario: string = '';  // Variável para armazenar o comentário

  constructor(
    public dialogRef: MatDialogRef<EditComentarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comentarioService: AvaliacoesService
  ) {
    this.comentario = { ...data.comentario };  // Cria uma cópia do comentário
    this.novoComentario = this.comentario.comentario; // Inicializa com o comentário existente
  }

  atualizarComentario() {
    // Cria um novo objeto com a propriedade comentario atualizada
    const comentarioAtualizado = { ...this.comentario, comentario: this.novoComentario };

    this.comentarioService.atualizarComentario(comentarioAtualizado.id, comentarioAtualizado).subscribe(
      (response: ComentarioResponse) => {
        console.log('Comentário atualizado com sucesso', response.status);
        this.dialogRef.close(true); // Fecha o diálogo com sucesso
      },
      (error: HttpErrorResponse) => {
        console.error('Erro ao atualizar o comentário', error.message);
      }
    );
  }
}
