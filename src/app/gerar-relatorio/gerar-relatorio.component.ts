import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-gerar-relatorio',
  templateUrl: './gerar-relatorio.component.html',
  styleUrls: ['./gerar-relatorio.component.css']
})
export class GerarRelatorioComponent implements AfterViewInit {
  chart1!: Chart;
  chart2!: Chart;

  data1 = {
    labels: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    datasets: [{
      label: 'Festas por Mês',
      data: [5, 7, 8, 6, 4, 3, 9, 11, 10, 6, 7, 5], // Substitua pelos dados reais
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  data2 = {
    labels: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    datasets: [{
      label: 'Média das Avaliações',
      data: [5, 4, 4.3, 3, 2, 4, 5, 1, 1, 5, 3, 4], // Substitua pelos dados reais
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };


  ngAfterViewInit() {
    this.initializeChart1('barChart1', 'chart1');
    this.initializeChart2('barChart2', 'chart2');
  }

  initializeChart1(canvasId: string, chartProperty: 'chart1') {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas) {
      this[chartProperty] = new Chart(canvas, {
        type: 'bar',
        data: this.data1,
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

  initializeChart2(canvasId: string, chartProperty: 'chart2') {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas) {
      this[chartProperty] = new Chart(canvas, {
        type: 'bar',
        data: this.data2,
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
}