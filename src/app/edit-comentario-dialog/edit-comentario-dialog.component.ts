// edit-comentario-dialog.component.ts
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
  novoComentario: string = '';  // Variable to store the new comment

  constructor(
    public dialogRef: MatDialogRef<EditComentarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comentarioService: AvaliacoesService
  ) {
    this.comentario = { ...data.comentario };  // Create a copy of the comment
    this.novoComentario = this.comentario.comentario; // Initialize with the existing comment
  }

  atualizarComentario(novoComentario: string): void {
    const comentarioAtualizado: ComentarioInterface = { 
        ...this.comentario, 
        comentario: novoComentario // Use o valor do parâmetro
    };

    console.log('Comentário enviado para o backend:', comentarioAtualizado.comentario);

    this.comentarioService.atualizarComentario(comentarioAtualizado.id, comentarioAtualizado).subscribe(
        (response: ComentarioResponse) => {
            console.log('Comentário atualizado com sucesso:', response);
            this.dialogRef.close(true);
        },
        (error: HttpErrorResponse) => {
            console.error('Erro ao atualizar o comentário:', error);
        }
    );
  }


  
}
