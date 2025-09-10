import type { ChartOptions } from '@/app/common/apexchart.model'
import { getCssVariableValue } from '@/app/core/utils/chartColor'
import { Component } from '@angular/core'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'review-analytics',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './review-analytics.component.html',
  styles: ``,
})
export class ReviewAnalyticsComponent {
  pageViewChart: Partial<ChartOptions> = {
    series: [80, 30],
    labels: ['Positive', 'Negative'],
    chart: {
      height: 300,
      width: 300,
      type: 'donut',
      sparkline: {
        enabled: !0,
      },
    },
    stroke: {
      colors: ['transparent'],
    },
    colors: [
      getCssVariableValue('--bs-success'),
      getCssVariableValue('--bs-danger'),
    ],
    tooltip: {
      theme: 'dark',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 100,
            width: 100,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  }
}
