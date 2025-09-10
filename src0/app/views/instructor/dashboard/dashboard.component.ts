import { Component } from '@angular/core'
import { CounterComponent } from './components/counter/counter.component'
import { ChartComponent } from './components/chart/chart.component'
import { SellingCoursesComponent } from './components/selling-courses/selling-courses.component'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CounterComponent, ChartComponent, SellingCoursesComponent],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent {}
