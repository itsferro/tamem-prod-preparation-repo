import { Component } from '@angular/core'
import { courseList } from '../../data'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'index3-trending-course',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './trending-course.component.html',
  styles: ``,
})
export class TrendingCourseComponent {
  courses = courseList
}
