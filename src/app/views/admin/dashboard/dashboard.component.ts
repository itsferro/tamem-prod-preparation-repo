import { Component } from '@angular/core'
import { CounterComponent } from './components/counter/counter.component'
import { EarningChartComponent } from './components/earning-chart/earning-chart.component'
import { SupportRequestComponent } from './components/support-request/support-request.component'
import { NoticeBoardComponent } from './components/notice-board/notice-board.component'
import { TopInstructorsComponent } from './components/top-instructors/top-instructors.component'
import { TrafficSourcesComponent } from './components/traffic-sources/traffic-sources.component'
import { ChartComponent } from '../../instructor/earning/components/chart/chart.component'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CounterComponent,
    EarningChartComponent,
    SupportRequestComponent,
    NoticeBoardComponent,
    TopInstructorsComponent,
    TrafficSourcesComponent,
    ChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent {}
