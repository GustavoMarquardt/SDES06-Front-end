import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { FestasService } from '../services/festas.service'; // Importe o serviço
import { FestaInterface } from '../../interfaces/FestaInterface'; // Importe o modelo

@Component({
  selector: 'app-gerar-relatorio',
  templateUrl: './gerar-relatorio.component.html',
  styleUrls: ['./gerar-relatorio.component.css']
})
export class GerarRelatorioComponent implements AfterViewInit, OnInit {
  chart!: Chart;
  festasPorMes: number[] = new Array(12).fill(0); // Array para armazenar as contagens de festas por mês

  constructor(private festasService: FestasService) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.festasService.getAllFestas().subscribe(response => {
      console.log('Resposta da API:', response);
      
      // Acessar diretamente a propriedade 'festas' da resposta
      const festas: FestaInterface[] = response[0].festas;
  
      // Processar as festas e contar por mês
      festas.forEach(festa => {
        const data = new Date(festa.data_e_hora);
        const mes = data.getMonth(); // Retorna o mês (0 = Janeiro, 11 = Dezembro)
        this.festasPorMes[mes]++;
      });
  
      // Inicializar o gráfico após carregar os dados
      this.initializeChart();
    });
  }

  ngAfterViewInit() {}

  initializeChart() {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    if (canvas) {
      this.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
          ],
          datasets: [{
            label: 'Festas por Mês',
            data: this.festasPorMes, // Use os dados processados
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
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
