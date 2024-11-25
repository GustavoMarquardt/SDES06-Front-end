import { Component } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './gerar-relatorio.component.html',
  styleUrls: ['./gerar-relatorio.component.css']
})
export class GerarRelatorioComponent{
  // Dados do gráfico
  public barChartData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      {
        label: 'Quantidade de Festas',
        data: [3, 5, 8, 2, 6, 7, 9, 4, 5, 6, 3, 4], // Quantidade de festas por mês
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1
      }
    ]
  };

  // Opções do gráfico
  public barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  public barChartType: any = 'bar';
}