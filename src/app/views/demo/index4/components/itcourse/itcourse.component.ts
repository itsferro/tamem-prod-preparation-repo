import { Component } from '@angular/core'
import { ITCourseList } from '../../data'

@Component({
  selector: 'index4-itcourse',
  standalone: true,
  imports: [],
  templateUrl: './itcourse.component.html',
  styles: ``,
})
export class ITCourseComponent {
  courseList = ITCourseList
}
