import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-lista-avaliacoes',
  standalone: true,
  imports: [],
  templateUrl: './lista-avaliacoes.component.html',
  styleUrl: './lista-avaliacoes.component.css'
})
export class ListaAvaliacoesComponent {

  constructor(
    private router: Router,
  ) {}

  navigateToFestas(): void {
    this.router.navigate(['/lobby']);
  }
}
