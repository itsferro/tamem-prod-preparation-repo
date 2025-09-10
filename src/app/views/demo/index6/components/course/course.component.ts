import { Component } from '@angular/core'
import { CourseList } from '../../data'

@Component({
  selector: 'index6-course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styles: ``,
})
export class CourseComponent {
  courseList = CourseList
}
