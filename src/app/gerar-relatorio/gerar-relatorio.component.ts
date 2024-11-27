import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { FestasService } from '../services/festas.service'; // Importe o serviço
import { FestaInterface } from '../../interfaces/FestaInterface'; // Importe o modelo
import { AvaliacoesService } from '../services/avalicao.service'; // Importe o serviço
import { AvalicaoInterface } from '../../interfaces/AvaliacaoInterface'; // Importe o modelo
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gerar-relatorio',
  templateUrl: './gerar-relatorio.component.html',
  styleUrls: ['./gerar-relatorio.component.css']
})
export class GerarRelatorioComponent implements AfterViewInit, OnInit {
  chart!: Chart;
  festasPorMes: number[] = Array(12).fill(0);
  qualidadePorMes: number[] = Array(12).fill(0);
  capacidadePorMes: number[] = Array(12).fill(0);

  constructor(
    private festasService: FestasService,
    private avaliacoesService: AvaliacoesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const anoRelatorio = parseInt(this.route.snapshot.paramMap.get('ano') || '0', 10);
    if (anoRelatorio) {
      this.carregarDados(anoRelatorio);
      setTimeout(() => {
        this.initializeChart1('barChart1', 'chart1');
        this.initializeChart2('barChart2', 'chart2');
        this.initializeChart3('barChart3', 'chart3');
      }, 300);
    } else {
      console.error('Ano inválido para relatório.');
    }
  }

  carregarDados(anoRelatorio: number) {
    this.festasService.getAllFestas().subscribe(response => {
      let festas: FestaInterface[] = response.festas.filter(festa => {
        const data = new Date(festa.data_e_hora);
        return data.getFullYear() === anoRelatorio;
      });

      festas.forEach(festa => {
        const data = new Date(festa.data_e_hora);
        const mes = data.getMonth(); // Janeiro = 0, Dezembro = 11
        this.festasPorMes[mes]++;
        this.capacidadePorMes[mes] += festa.capacidade; // Acumula a capacidade
      });

      let avaliacoesPorMes: number[] = Array(12).fill(0);
      festas.forEach(festa => {
        this.avaliacoesService.getAvaliacoesByFestaId2(festa.id).subscribe(response => {
          if (response) {
            response.avaliacoes.forEach(av => {
              const data = new Date(festa.data_e_hora);
              const mes = data.getMonth();
              this.qualidadePorMes[mes] += (av.atendimento + av.bar + av.localizcao + av.organizacao + av.preco + av.qualidade_musica) / 6;
              avaliacoesPorMes[mes]++;
            });
          }
        });
      });

      // Atualiza as médias após processar os dados
      setTimeout(() => {
        this.qualidadePorMes = this.qualidadePorMes.map((q, i) => (avaliacoesPorMes[i] ? q / avaliacoesPorMes[i] : 0));
        this.capacidadePorMes = this.capacidadePorMes.map((c, i) => (this.festasPorMes[i] ? c / this.festasPorMes[i] : 0));
      }, 150);
    });
  }

  ngAfterViewInit() {}

  chart1!: Chart;
  initializeChart1(canvasId: string, chartProperty: 'chart1') {
    let data = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [{
        label: 'Festas por Mês',
        data: this.festasPorMes,
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1
      }]
    };

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas) {
      this[chartProperty] = new Chart(canvas, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            x: { title: { display: true, text: 'Meses' } },
            y: { title: { display: true, text: 'Quantidade de Festas' }, beginAtZero: true }
          },
          plugins: { legend: { position: 'top' } }
        }
      });
    }
  }

  chart2!: Chart;
  initializeChart2(canvasId: string, chartProperty: 'chart2') {
    let data = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [{
        label: 'Avaliação Média das Festas',
        data: this.qualidadePorMes,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1
      }]
    };

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas) {
      this[chartProperty] = new Chart(canvas, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            x: { title: { display: true, text: 'Meses' } },
            y: { title: { display: true, text: 'Avaliação Média' }, beginAtZero: true }
          },
          plugins: { legend: { position: 'top' } }
        }
      });
    }
  }

  chart3!: Chart;
  initializeChart3(canvasId: string, chartProperty: 'chart3') {
    let data = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [{
        label: 'Capacidade Máxima Média Mensal',
        data: this.capacidadePorMes,
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1
      }]
    };

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas) {
      this[chartProperty] = new Chart(canvas, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            x: { title: { display: true, text: 'Meses' } },
            y: { title: { display: true, text: 'Capacidade Média' }, beginAtZero: true }
          },
          plugins: { legend: { position: 'top' } }
        }
      });
    }
  }

  navigateToSelecionarAno(): void {
    this.router.navigate(['/selecionarAno']);
  }
}
