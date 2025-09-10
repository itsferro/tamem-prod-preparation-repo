import type { ChartOptions } from '@/app/common/apexchart.model'
import { currency } from '@/app/common/constants'
import { getCssVariableValue } from '@/app/core/utils/chartColor'
import { Component } from '@angular/core'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'earning-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './chart.component.html',
  styles: ``,
})
export class ChartComponent {
  currency = currency

  payoutEarning: Partial<ChartOptions> = {
    series: [
      {
        name: 'Payout',
        data: [
          500, 700, 900, 1500, 1800, 1000, 0, 2000, 3200, 3000, 4800, 4000,
        ],
      },
    ],
    chart: {
      height: 300,
      type: 'area',
      sparkline: {
        enabled: !0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    colors: [getCssVariableValue('--bs-primary')],
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct ',
        'Nov',
        'Dec',
      ],
    },
    tooltip: {
      y: {
        title: {
          formatter: function (e) {
            return '' + '$'
          },
        },
      },
      marker: {
        show: !1,
      },
    },
  }
}
