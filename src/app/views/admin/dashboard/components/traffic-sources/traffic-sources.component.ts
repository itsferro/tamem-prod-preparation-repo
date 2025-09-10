import type { ChartOptions } from '@/app/common/apexchart.model'
import { getCssVariableValue } from '@/app/core/utils/chartColor'
import { Component } from '@angular/core'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'admin-dashboard-traffic-sources',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './traffic-sources.component.html',
  styles: ``,
})
export class TrafficSourcesComponent {
  trafficViewChart: Partial<ChartOptions> = {
    series: [70, 15, 10, 5],
    labels: ['Course-1', 'Course-2', 'Course-3', 'Course-4'],
    chart: {
      height: 200,
      width: 200,
      offsetX: 0,
      type: 'donut',
      sparkline: {
        enabled: !0,
      },
    },
    colors: [
      getCssVariableValue('--bs-primary'),
      getCssVariableValue('--bs-success'),
      getCssVariableValue('--bs-warning'),
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
