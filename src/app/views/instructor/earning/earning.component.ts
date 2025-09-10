import { Component } from '@angular/core'
import { StateComponent } from './components/state/state.component'
import { ChartComponent } from './components/chart/chart.component'
import { EarningSourceChartComponent } from './components/earning-source-chart/earning-source-chart.component'

@Component({
  selector: 'app-earning',
  standalone: true,
  imports: [StateComponent, ChartComponent, EarningSourceChartComponent],
  templateUrl: './earning.component.html',
  styles: ``,
})
export class EarningComponent {}
