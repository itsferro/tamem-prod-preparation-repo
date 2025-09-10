import { Component } from '@angular/core'
import { TrendingCourses } from '../../data'

@Component({
  selector: 'index2-trending-course',
  standalone: true,
  imports: [],
  templateUrl: './trending-course.component.html',
  styles: ``,
})
export class TrendingCourseComponent {
  courseList = TrendingCourses
}
