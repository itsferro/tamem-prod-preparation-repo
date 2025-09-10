import { Component } from '@angular/core'
import { SubjectList } from '../../data'

@Component({
  selector: 'index7-course-list',
  standalone: true,
  imports: [],
  templateUrl: './course-list.component.html',
  styles: ``,
})
export class CourseListComponent {
  subjects = SubjectList
}
