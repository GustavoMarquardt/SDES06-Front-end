import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { FestasService } from '../services/festas.service'; // Importe o serviço
import { FestaInterface } from '../../interfaces/FestaInterface'; // Importe o modelo
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerar-relatorio',
  templateUrl: './gerar-relatorio.component.html',
  styleUrls: ['./gerar-relatorio.component.css']
})
export class GerarRelatorioComponent implements AfterViewInit, OnInit {
  chart!: Chart;
  festasPorMes: number[] = [0,0,0,0,0,0,0,0,0,0,0,0]; // Array para armazenar as contagens de festas por mês

  constructor(private festasService: FestasService, private router: Router) {}

  ngOnInit() {
    this.carregarDados();
    console.log("Tipo esperado: array",typeof([1,2,3,4,5,6,7,8,9,10,11,12]))
    console.log("Tipo de festasPorMes",typeof(this.festasPorMes))
    setTimeout(() => {
      console.log("this.response.festasPorMes:::", this.festasPorMes)
      this.initializeChart1('barChart1', 'chart1')
      this.initializeChart2('barChart2', 'chart2')
      this.initializeChart3('barChart3', 'chart3')
    }, 200)
  }
  

  carregarDados() {
    this.festasService.getAllFestas().subscribe(response => {
      console.log('Resposta da API:', typeof(response));
      console.log('response[0]: ', typeof(response.festas));
  
      // Acessar diretamente a propriedade 'festas' da resposta
      const festas: FestaInterface[] = response.festas;
  
      // Processar as festas e contar por mês
      festas.forEach(festa => {
        const data = new Date(festa.data_e_hora);
        const mes = data.getMonth(); // Retorna o mês (0 = Janeiro, 11 = Dezembro)
        this.festasPorMes[mes]++;
        console.log(this.festasPorMes)
      });
    });
    this.festasPorMes = this.festasPorMes.slice(0, 12)
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

  chart3!: Chart;
  initializeChart3(canvasId: string, chartProperty: 'chart3') {
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

  navigateToCadastroFesta(): void {
    this.router.navigate(['/cadastrarFesta']);
  }

  navigateToLogout(): void {
    this.router.navigate(['/']);
  }

  navigateToEdit():void{
    this.router.navigate(['/editarPerfil']);
  }

  navigateToFestas(): void {
    this.router.navigate(['/lobby'])
  }

  navigateToRelatorio(): void {
    this.router.navigate(['/gerarRelatorio'])
  }
}
