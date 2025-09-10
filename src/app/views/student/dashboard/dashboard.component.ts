import { Component } from '@angular/core'
import { CounterStateComponent } from './components/counter-state/counter-state.component'
import { CourseListComponent } from './components/course-list/course-list.component'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CounterStateComponent,
    CourseListComponent,
    SelectFormInputDirective,
  ],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent {}
