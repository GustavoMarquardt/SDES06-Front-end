import { Component, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FestasService } from '../services/festas.service';  // Ajuste conforme o seu serviço
import { FestaResponse } from '../../interfaces/FestaInterface';
import { ConfirmacaoDialogComponent } from '../confirmacao-dialog/confirmacao-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditarFestaDialogComponent } from '../editar-festa-dialog/editar-festa-dialog.component';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
})

@NgModule({
  declarations: [LobbyComponent],
  imports: [CommonModule,MatTableModule,MatCardModule ,MatIconModule ],
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
      return;  // Não prosseguir se o userId for nulo
    }
    
    // Convertendo o userId para número
    const userIdNumber = Number(userId);
    
    // Verifique se a conversão foi bem-sucedida
    if (isNaN(userIdNumber)) {
      this.errorMessage = 'ID de usuário inválido';
      return;
    }
  
    this.festasService.getFestaCriador(userIdNumber).subscribe({
      next: (data: FestaResponse) => {
        console.log(data);  // Verifique a resposta da API no console
        if (Array.isArray(data)) {  // Aqui esperamos que 'data' seja um array diretamente
          this.festas = data;  // Atribua o array de festas
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
      data: { ...festa },  // Passa os dados da festa para o diálogo
    });

    // Espera o retorno dos dados atualizados
    dialogRef.afterClosed().subscribe(updatedFesta => {
      if (updatedFesta) {
        // Chama o serviço para salvar a festa editada
        this.festasService.atualizarFesta(updatedFesta).subscribe({
          next: () => {
            this.getFestas();  // Atualiza a lista de festas
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
        this.getFestas(); // Atualiza a lista de festas após a exclusão
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

  navigateToLogout(): void {
    this.router.navigate(['/']);
  }

  navigateToEdit():void{
    this.router.navigate(['/editarPerfil']);
  }
}
