import type { ChartOptions } from '@/app/common/apexchart.model'
import { currency } from '@/app/common/constants'
import { getCssVariableValue } from '@/app/core/utils/chartColor'
import { Component } from '@angular/core'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'detail-charts',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './charts.component.html',
  styles: ``,
})
export class ChartsComponent {
  currency = currency

  studentActiveChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Conversion',
        data: [200, 290, 500, 500, 430, 316, 478, 700],
      },
    ],
    chart: {
      height: 130,
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
    colors: [getCssVariableValue('--bs-success')],
    xaxis: {
      type: 'category',
      categories: [
        'Dec 01',
        'Dec 02',
        'Dec 03',
        'Dec 04',
        'Dec 05',
        'Dec 06',
        'Dec 07',
        'Dec 08',
        'Dec 09 ',
        'Dec 10',
        'Dec 11',
      ],
    },
    tooltip: {
      y: {
        title: {
          formatter: function (e) {
            return ''
          },
        },
      },
      marker: {
        show: !1,
      },
    },
  }

  studentActiveChart2: Partial<ChartOptions> = {
    series: [
      {
        name: 'Conversion',
        data: [200, 290, 325, 500, 600, 316, 478, 700],
      },
    ],
    chart: {
      height: 130,
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
    colors: [getCssVariableValue('--bs-purple')],
    xaxis: {
      type: 'category',
      categories: [
        'Dec 01',
        'Dec 02',
        'Dec 03',
        'Dec 04',
        'Dec 05',
        'Dec 06',
        'Dec 07',
        'Dec 08',
        'Dec 09 ',
        'Dec 10',
        'Dec 11',
      ],
    },
    tooltip: {
      y: {
        title: {
          formatter: function (e) {
            return ''
          },
        },
      },
      marker: {
        show: !1,
      },
    },
  }
}
