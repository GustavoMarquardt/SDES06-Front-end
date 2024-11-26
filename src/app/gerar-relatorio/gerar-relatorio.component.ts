import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { FestasService } from '../services/festas.service'; // Importe o serviço
import { FestaInterface } from '../../interfaces/FestaInterface'; // Importe o modelo
import { AvaliacoesService } from '../services/avalicao.service'; // Importe o serviço
import { AvalicaoInterface } from '../../interfaces/AvaliacaoInterface'; // Importe o modelo

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

  constructor(private festasService: FestasService, private avaliacoesService: AvaliacoesService) {}

  ngOnInit() {
    this.carregarDados();
    setTimeout(() => {
      this.initializeChart1('barChart1', 'chart1')
      this.initializeChart2('barChart2', 'chart2')
      this.initializeChart3('barChart3', 'chart3')
    }, 400)
  }

  carregarDados() {
    this.festasService.getAllFestas().subscribe(response => {
  
      // Acessar diretamente a propriedade 'festas' da resposta
      const festas: FestaInterface[] = response.festas;
  
      // Processar as festas e contar por mês
      festas.forEach(festa => {
        const data = new Date(festa.data_e_hora);
        const mes = data.getMonth(); // Retorna o mês (0 = Janeiro, 11 = Dezembro)
        this.festasPorMes[mes]++;
      });
      this.festasPorMes = this.festasPorMes.slice(0, 12)


      let avaliacoesPorMes: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
      festas.forEach(festa => {
        this.avaliacoesService.getAvaliacoesByFestaId2(festa.id).subscribe(response => {
          if(response){
            response.avaliacoes.forEach(av =>{
              const data = new Date(festa.data_e_hora)
              const mes = data.getMonth();
              this.qualidadePorMes[mes] += (av.atendimento + av.bar + av.localizcao + av.organizacao + av.preco + av.qualidade_musica)/6
              avaliacoesPorMes[mes]++
              console.log("Qualidade por mes:", this.qualidadePorMes)
              //console.log("N° Avaliacoes: ", n_avaliacoes)
            })
          }
        })
      });

      this.qualidadePorMes = this.qualidadePorMes.slice(0, 12)
      setTimeout(() => { 
        let i = 0
        this.qualidadePorMes.forEach(q => {
          if(!avaliacoesPorMes[i]){
            this.qualidadePorMes[i] = 0
          }
          else this.qualidadePorMes[i] = q/avaliacoesPorMes[i]
          i++
        })
        this.qualidadePorMes = this.qualidadePorMes.slice(0, 12)
        console.log("N° de avaliacoes por mes: ", avaliacoesPorMes)
        console.log("Qualidade por mes final:", this.qualidadePorMes)
      }, 150)


      festas.forEach(festa => {
        const data = new Date(festa.data_e_hora);
        const mes = data.getMonth(); // Retorna o mês (0 = Janeiro, 11 = Dezembro)
        this.capacidadePorMes[mes] += festa.capacidade
      });

      this.qualidadePorMes.forEach(c => {
        let i = 0
        if(!this.festasPorMes[i]){
          this.capacidadePorMes[i] = 0
        }
        else this.capacidadePorMes[i] = c/this.festasPorMes[i]
        i++
      })

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
        backgroundColor: 'rgba(75, 192, 192, 0.3)',
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
        backgroundColor: 'rgba(75, 192, 192, 0.3)',
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
        label: 'Festas por Mês',
        data: this.capacidadePorMes, // Substitua pelos dados reais
        backgroundColor: 'rgba(75, 192, 192, 0.3)',
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
}
