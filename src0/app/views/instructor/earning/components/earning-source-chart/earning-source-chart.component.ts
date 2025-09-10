import type { ChartOptions } from '@/app/common/apexchart.model'
import { getCssVariableValue } from '@/app/core/utils/chartColor'
import { Component } from '@angular/core'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'earning-source-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './earning-source-chart.component.html',
  styles: ``,
})
export class EarningSourceChartComponent {
  pageViewsChart: Partial<ChartOptions> = {
    series: [50, 20, 20, 10, 10],
    labels: ['Course-1', 'Course-2', 'Course-3', 'Course-4', 'Course-5'],
    chart: {
      height: 300,
      width: 300,
      offsetX: 50,
      type: 'donut',
      sparkline: {
        enabled: !0,
      },
    },
    colors: [
      getCssVariableValue('--bs-success'),
      getCssVariableValue('--bs-warning'),
      getCssVariableValue('--bs-danger'),
      getCssVariableValue('--bs-primary'),
      getCssVariableValue('--bs-secondary'),
    ],
    tooltip: {
      theme: 'dark',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
            height: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  }
}
