import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FestaInterface } from '../../interfaces/FestaInterface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-festa-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './editar-festa-dialog.component.html',
  styleUrls: ['./editar-festa-dialog.component.css']
})
export class EditarFestaDialogComponent {
  // Recebe os dados da festa a ser editada
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FestaInterface,  // Dados passados ao abrir o diálogo
    private dialogRef: MatDialogRef<EditarFestaDialogComponent>
  ) {
    console.log(data,"dados do dialog");
  }

  // Método chamado quando o usuário salva os dados
  salvarEdicoes(): void {
    this.dialogRef.close(this.data);  // Retorna os dados atualizados
  }

  // Método chamado quando o usuário cancela
  cancelarEdicoes(): void {
    this.dialogRef.close();  // Apenas fecha o diálogo sem enviar dados
  }
}
