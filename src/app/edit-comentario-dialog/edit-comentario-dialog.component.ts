import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http'; 
import { ComentarioInterface, ComentarioResponse } from '../../interfaces/ComentarioInterface';
import { AvaliacoesService } from '../services/avalicao.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-comentario-dialog',
  templateUrl: './edit-comentario-dialog.component.html',
  styleUrls: ['./edit-comentario-dialog.component.css'],
  imports: [
    BrowserModule,
    FormsModule,  // Certifique-se de importar o FormsModule aqui
    MatDialogModule
  ],
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

  }

  // Método que é chamado a cada alteração do campo de entrada
  logComentario(comentario: string) {
    console.log('Comentário Atualizado:', comentario);
  }

  atualizarComentario() {
    // Cria um novo objeto com a propriedade comentario atualizada
    const comentarioAtualizado = { ...this.comentario, comentario: this.novoComentario };
    console.log('Comentário a ser atualizado:', comentarioAtualizado);

    this.comentarioService.atualizarComentario(comentarioAtualizado.id, comentarioAtualizado).subscribe(
      (response: ComentarioResponse) => {
        console.log('Comentário atualizado com sucesso', response.status);
        this.dialogRef.close(true);
      },
      (error: HttpErrorResponse) => {
        console.error('Erro ao atualizar o comentário', error.message);
      }
    );
  }
}
