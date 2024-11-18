import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FestasService } from '../services/festas.service';
import { FestaResponse } from '../../interfaces/FestaInterface';
import { ConfirmacaoDialogComponent } from '../confirmacao-dialog/confirmacao-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditarFestaDialogComponent } from '../editar-festa-dialog/editar-festa-dialog.component';

@Component({
  standalone: true,
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule], // Importações de módulos para standalone
})
export class LobbyComponent {
  festas: any[] = [];
  errorMessage: string = '';
  displayedColumns: string[] = ['nome_da_festa', 'data_e_hora', 'localizacao', 'capacidade', 'categoria', 'acoes'];

  constructor(
    private festasService: FestasService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFestas();
  }

  getFestas(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId == null) {
      this.errorMessage = 'Erro ao carregar as festas';
      return;
    }

    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber)) {
      this.errorMessage = 'ID de usuário inválido';
      return;
    }

    this.festasService.getFestaCriador(userIdNumber).subscribe({
      next: (data: FestaResponse) => {
        console.log(data);
        if (Array.isArray(data)) {
          this.festas = data;
        } else {
          console.error('Estrutura de dados inválida');
          this.errorMessage = 'Estrutura de dados inválida';
        }
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Erro ao carregar as festas';
      }
    });
  }

  editarFesta(festa: any): void {
    const dialogRef = this.dialog.open(EditarFestaDialogComponent, {
      width: '400px',
      data: { ...festa },
    });

    dialogRef.afterClosed().subscribe(updatedFesta => {
      if (updatedFesta) {
        this.festasService.atualizarFesta(updatedFesta).subscribe({
          next: () => {
            this.getFestas();
          },
          error: (error) => {
            console.error(error);
            this.errorMessage = 'Erro ao atualizar a festa';
          }
        });
      }
    });
  }

  confirmarExclusao(festaId: number): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '300px',
      maxWidth: '80vw',
      height: '200px',
      data: { mensagem: 'Tem certeza que deseja excluir esta festa?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmado') {
        this.excluirFesta(festaId);
      }
    });
  }

  excluirFesta(festaId: number): void {
    this.festasService.excluirFesta(festaId).subscribe({
      next: () => {
<<<<<<< HEAD
        this.getFestas();
=======
        this.getFestas(); // Atualiza a lista de festas após a exclusão
>>>>>>> 5ccc3a700c73be4aec669510c023024ac4ce14b9
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Erro ao excluir a festa';
      }
    });
  }

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return new Date(date).toLocaleDateString('pt-BR', options);
  }

  navigateToCadastroFesta(): void {
    this.router.navigate(['/cadastrarFesta']);
  }

<<<<<<< HEAD
  navigateToEdit(): void {
    console.log('BORAAAA');
=======
  navigateToLogout(): void {
    this.router.navigate(['/']);
  }

  navigateToEdit():void{
>>>>>>> 5ccc3a700c73be4aec669510c023024ac4ce14b9
    this.router.navigate(['/editarPerfil']);
  }

  navigateToListarFestas(): void {
    this.router.navigate(['/listarFestas'])
  }

  navigateToMinhasFestas(): void {
    this.router.navigate(['/lobby'])
  }
}
