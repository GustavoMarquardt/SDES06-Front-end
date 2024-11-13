import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirmacao-dialog.component.html',
  styleUrl: './confirmacao-dialog.component.css'
})
export class ConfirmacaoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensagem: string }
  ) {}

  // Método para fechar o diálogo com o valor 'confirmado'
  onConfirmar(): void {
    this.dialogRef.close('confirmado');
  }

  // Método para fechar o diálogo com o valor 'cancelado'
  onCancelar(): void {
    this.dialogRef.close('cancelado');
  }
}
