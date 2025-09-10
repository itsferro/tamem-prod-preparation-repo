import type { ChartOptions } from '@/app/common/apexchart.model'
import { currency } from '@/app/common/constants'
import { getCssVariableValue } from '@/app/core/utils/chartColor'
import { Component } from '@angular/core'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'dashboard-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './chart.component.html',
  styles: ``,
})
export class ChartComponent {
  currency = currency

  payoutChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Payout',
        data: [2909, 1259, 950, 1563, 1825, 2526, 2010, 3260, 3005, 3860, 4039],
      },
    ],
    chart: {
      height: 300,
      type: 'area',
      toolbar: {
        show: false,
      },
    },

    dataLabels: {
      enabled: true,
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
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct ',
        'Nov',
        'Dec',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    ],
    tooltip: {
      y: {
        title: {
          formatter: function () {
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
