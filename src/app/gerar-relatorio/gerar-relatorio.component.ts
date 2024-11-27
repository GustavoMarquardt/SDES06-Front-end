import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { FestasService } from '../services/festas.service'; 
import { FestaInterface } from '../../interfaces/FestaInterface'; 
import { AvaliacoesService } from '../services/avalicao.service'; 
import { AvalicaoInterface } from '../../interfaces/AvaliacaoInterface'; 
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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

  constructor(private festasService: FestasService, 
              private avaliacoesService: AvaliacoesService, 
              private router: Router,
              private route: ActivatedRoute // Injete o ActivatedRoute
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
      // Acessar diretamente a propriedade 'festas' da resposta
      let festas: FestaInterface[] = response.festas;
      let festasAux: FestaInterface[] = [...festas]

    
      console.log("Festas antes de tudo:", festas)
  
      let i = 0
      festas.forEach(festa => {
        //console.log("Festas: ",festas)
        ///console.log("Festa atual: ",festa.nome_da_festa)
        const data = new Date(festa.data_e_hora);
        let ano = data.getFullYear()
        //console.log("Ano da festa atual: ", ano)
        //console.log("Index da festa:", festas.indexOf(festa), 1)
        if(ano != this.anoRelatorio) festasAux.splice(festasAux.indexOf(festa), 1)
      })
      
      festas = festasAux
      console.log("Festas depois de tudo:", festas)
      console.log("FestasAux depois de tudo:", festasAux)

      
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
      }, 150)


     setTimeout(() => {
      festas.forEach(festa => {
        const data = new Date(festa.data_e_hora);
        const mes = data.getMonth(); // Retorna o mês (0 = Janeiro, 11 = Dezembro)
        this.capacidadePorMes[mes] += Math.round(festa.capacidade/(this.festasPorMes[mes]))
      });
     }, 0); 
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
