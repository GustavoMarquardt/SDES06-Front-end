import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selecionar-ano-relatorio',
  standalone: true,
  templateUrl: './seleonar-ano-relatorio.component.html',
  styleUrls: ['./seleonar-ano-relatorio.component.css']
})
export class SelecionarAnoRelatorioComponent {
  anoSelecionado: string = ''; // Propriedade para armazenar o ano selecionado

  constructor(private router: Router) {}

  navigateToCadastroFesta(): void {
    this.router.navigate(['/cadastrarFesta']);
  }

  navigateToLogout(): void {
    this.router.navigate(['/']);
  }

  navigateToEdit(): void {
    this.router.navigate(['/editarPerfil']);
  }

  navigateToFestas(): void {
    this.router.navigate(['/lobby']);
  }

  navigateToRelatorio(): void {
    this.router.navigate(['/selecionarAno']);
  }

  // Atualiza o ano selecionado
  onAnoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.anoSelecionado = selectElement.value;
  }

  // Previne o comportamento padrão do formulário e navega para a URL correta
  enviou(event: Event): void {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    if (this.anoSelecionado) {
      this.router.navigate(['/relatorio/' + this.anoSelecionado]);
    } else {
      console.error('Nenhum ano foi selecionado.');
    }
  }
}
