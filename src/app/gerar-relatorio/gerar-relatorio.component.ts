import { Component, AfterViewInit, OnInit, ChangeDetectorRef, NgModule } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { FestasService } from '../services/festas.service'; 
import { FestaInterface } from '../../interfaces/FestaInterface'; 
import { AvaliacoesService } from '../services/avalicao.service'; 
import { AvalicaoInterface } from '../../interfaces/AvaliacaoInterface'; 
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GerarRelatorioComponent
  ]
})

@Component({
  selector: 'app-gerar-relatorio',
  templateUrl: './gerar-relatorio.component.html',
  styleUrls: ['./gerar-relatorio.component.css']
})

export class GerarRelatorioComponent implements AfterViewInit, OnInit {
  chart!: Chart;
  festasPorMes: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  qualidadePorMes: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  capacidadePorMes: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  anoRelatorio: number = new Date().getFullYear();
  topFestas: { nome: string; media: number }[] = [];
  topFestasCapacidade: { nome: string; capacidadeMedia: number }[] = [];
  topMeses: { mes: string; quantidade: number }[] = [];

  constructor(private festasService: FestasService, 
              private avaliacoesService: AvaliacoesService, 
              private router: Router,
              private route: ActivatedRoute, // Injete o ActivatedRoute
              private cdr: ChangeDetectorRef
            ) {}

  ngOnInit() {
    const ano = this.route.snapshot.paramMap.get('ano');
    if (ano) {
      this.anoRelatorio = parseInt(ano, 10); // Converta para número
    }
    this.carregarDados();
    setTimeout(() => {
      this.initializeChart1('barChart1', 'chart1')
      this.initializeChart2('barChart2', 'chart2')
      this.initializeChart3('barChart3', 'chart3')
    }, 1500)
  }

  carregarDados() {
    this.festasService.getAllFestas().subscribe(response => {
      // Filtra as festas pelo ano selecionado
      const festas = response.festas.filter(festa => {
        const data = new Date(festa.data_e_hora);
        return data.getFullYear() === this.anoRelatorio; // Filtra festas pelo ano selecionado
      });
  
      let avaliacoesComMedia: { nome: string; media: number }[] = [];
      let capacidadeMediaFestas: { nome: string; capacidadeMedia: number }[] = [];
      let avaliacoesPromises = festas.map(festa => {
        return new Promise<void>(resolve => {
          // Obtém avaliações para cada festa
          this.avaliacoesService.getAvaliacoesByFestaId2(festa.id).subscribe(response => {
            if (response) {
              let somaAvaliacoes = 0;
              let totalAvaliacoes = 0;
  
              // Calcula a média de avaliação
              response.avaliacoes.forEach(av => {
                somaAvaliacoes +=
                  (av.atendimento +
                    av.bar +
                    av.localizcao +
                    av.organizacao +
                    av.preco +
                    av.qualidade_musica) / 6;
                totalAvaliacoes++;
              });
  
              const media = totalAvaliacoes ? somaAvaliacoes / totalAvaliacoes : 0;
  
              // Adiciona ao array de médias de avaliações
              avaliacoesComMedia.push({
                nome: festa.nome_da_festa,
                media: parseFloat(media.toFixed(2)), // Arredonda para 2 casas decimais
              });
  
              // Adiciona a capacidade para o Top de Capacidade
              capacidadeMediaFestas.push({
                nome: festa.nome_da_festa,
                capacidadeMedia: festa.capacidade,
              });
            }
  
            // Incrementa o contador de festas por mês
            const mes = new Date(festa.data_e_hora).getMonth(); // Janeiro = 0, Dezembro = 11
            resolve(); // Finaliza a Promise para essa festa
          });
        });
      });
  
      // Aguarda todas as promessas de avaliações serem concluídas
      Promise.all(avaliacoesPromises).then(() => {
        // Calcula o Top 5 Festas com melhores avaliações
        this.topFestas = avaliacoesComMedia
          .sort((a, b) => b.media - a.media) // Ordena em ordem decrescente de média
          .slice(0, 5); // Seleciona as 5 melhores festas
  
        // Calcula o Top 5 Maiores Festas por capacidade média
        this.topFestasCapacidade = capacidadeMediaFestas
          .sort((a, b) => b.capacidadeMedia - a.capacidadeMedia) // Ordena em ordem decrescente de capacidade
          .slice(0, 5); // Seleciona as 5 maiores festas
  
        // Calcula os meses com mais festas
        const meses = [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
  
        this.topMeses = this.festasPorMes
          .map((quantidade, index) => ({ mes: meses[index], quantidade }))
          .sort((a, b) => b.quantidade - a.quantidade); // Ordena por quantidade de festas
  
        console.log('Top 5 Festas por Qualidade:', this.topFestas);
        console.log('Top 5 Festas por Capacidade:', this.topFestasCapacidade);
        console.log('Meses com Mais Festas:', this.topMeses);
  
        // Força a detecção de mudanças
        this.cdr.detectChanges();
      });
  
      // Atualiza os gráficos
      this.atualizarDadosGraficos(festas);
    });
  }
  
  
  
  
  
  atualizarDadosGraficos(festas: FestaInterface[]) {
    let avaliacoesPorMes: number[] = Array(12).fill(0);
  
    festas.forEach(festa => {
      const data = new Date(festa.data_e_hora);
      const mes = data.getMonth(); // Retorna o mês (0 = Janeiro, 11 = Dezembro)
      this.festasPorMes[mes]++;
  
      this.avaliacoesService.getAvaliacoesByFestaId2(festa.id).subscribe(response => {
        if (response) {
          response.avaliacoes.forEach(av => {
            const mediaAvaliacao =
              (av.atendimento +
                av.bar +
                av.localizcao +
                av.organizacao +
                av.preco +
                av.qualidade_musica) /
              6;
  
            this.qualidadePorMes[mes] += mediaAvaliacao;
            avaliacoesPorMes[mes]++;
          });
  
          // Atualiza a qualidade média mensal
          this.qualidadePorMes = this.qualidadePorMes.map((total, i) =>
            avaliacoesPorMes[i] ? parseFloat((total / avaliacoesPorMes[i]).toFixed(2)) : 0
          );
        }
      });
  
      // Calcula a capacidade média mensal
      this.capacidadePorMes[mes] += festa.capacidade;
    });
  
    this.capacidadePorMes = this.capacidadePorMes.map((total, i) =>
      this.festasPorMes[i] ? Math.round(total / this.festasPorMes[i]) : 0
    );
  }
  
  
  calcularTopFestas(festas: FestaInterface[]) {
    let avaliacoesComMedia: { nome: string; media: number }[] = [];
  
    festas.forEach(festa => {
      this.avaliacoesService.getAvaliacoesByFestaId2(festa.id).subscribe(response => {
        if (response) {
          let somaAvaliacoes = 0;
          let totalAvaliacoes = 0;
  
          response.avaliacoes.forEach(av => {
            somaAvaliacoes +=
              (av.atendimento +
                av.bar +
                av.localizcao +
                av.organizacao +
                av.preco +
                av.qualidade_musica) /
              6;
            totalAvaliacoes++;
          });
  
          const media = totalAvaliacoes ? somaAvaliacoes / totalAvaliacoes : 0;
  
          avaliacoesComMedia.push({
            nome: festa.nome_da_festa,
            media: parseFloat(media.toFixed(2)), // Arredonda a média para 2 casas decimais
          });
  
          // Após calcular as médias para todas as festas, ordena e seleciona as top 5
          if (avaliacoesComMedia.length === festas.length) {
            this.topFestas = avaliacoesComMedia
              .sort((a, b) => b.media - a.media) // Ordena em ordem decrescente de média
              .slice(0, 5); // Seleciona as 5 melhores festas
          }
        }
      });
    });
  }
  

  ngAfterViewInit() {}

  chart1!: Chart;
  initializeChart1(canvasId: string, chartProperty: 'chart1') {
    let data = {
      labels: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      datasets: [{
        label: 'Festas por Mês',
        data: this.festasPorMes, // Substitua pelos dados reais
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1
      }]
    };

    if (this.chart) {
      this.chart.destroy();
    }
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas) {
      this[chartProperty] = new Chart(canvas, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            x: {
              title: { display: true, text: 'Meses' }
            },
            y: {
              title: { display: true, text: 'Quantidade de Festas' },
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }
  }

  chart2!: Chart;
  initializeChart2(canvasId: string, chartProperty: 'chart2') {
    let data = {
      labels: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      datasets: [{
        label: 'Avaliação Média das Festas',
        data: this.qualidadePorMes, // Substitua pelos dados reais
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1
      }]
    };

    if (this.chart) {
      this.chart.destroy();
    }
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas) {
      this[chartProperty] = new Chart(canvas, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            x: {
              title: { display: true, text: 'Meses' }
            },
            y: {
              title: { display: true, text: 'Avaliação Média' },
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }
  }

  chart3!: Chart;
  initializeChart3(canvasId: string, chartProperty: 'chart3') {
    let data = {
      labels: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      datasets: [{
        label: 'Capacidade Máxima Média Mensal',
        data: this.capacidadePorMes, // Substitua pelos dados reais
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1
      }]
    };

    if (this.chart) {
      this.chart.destroy();
    }
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas) {
      this[chartProperty] = new Chart(canvas, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            x: {
              title: { display: true, text: 'Meses' }
            },
            y: {
              title: { display: true, text: 'Capacidade Médias' },
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }
  }

  navigateToSelecionarAno(): void {
    this.router.navigate(['/selecionarAno'])
  }
}
