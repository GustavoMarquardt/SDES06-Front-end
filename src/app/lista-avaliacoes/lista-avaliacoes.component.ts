import { ChangeDetectorRef, Component } from '@angular/core';
import { AvalicaoInterface, AvalicaoResponse } from '../../interfaces/AvaliacaoInterface';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AvaliacoesService } from '../services/avalicao.service';


@Component({
  selector: 'app-lista-avaliacoes',
  standalone: true,
  imports: [],
  templateUrl: './lista-avaliacoes.component.html',
  styleUrl: './lista-avaliacoes.component.css'
})
export class ListaAvaliacoesComponent {
  avaliacoes: AvalicaoResponse[] = [];
  errorMessage: string = '';

  constructor(
    private avaliacaoService: AvaliacoesService,
    private router: Router,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

  }

  navigateToFestas(): void {
    this.router.navigate(['/lobby']);
  }
}
