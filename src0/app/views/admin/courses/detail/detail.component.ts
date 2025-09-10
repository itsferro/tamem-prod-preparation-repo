import { Component } from '@angular/core'
import { CourseInfoComponent } from './components/course-info/course-info.component'
import { ChartsComponent } from './components/charts/charts.component'
import { StudentReviewComponent } from './components/student-review/student-review.component'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CourseInfoComponent,
    ChartsComponent,
    StudentReviewComponent,
    RouterLink,
  ],
  templateUrl: './detail.component.html',
  styles: ``,
})
export class DetailComponent {}
