import { Component } from '@angular/core'
import { InstructorCourses } from '../../data'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'single-courses-list',
  standalone: true,
  imports: [NgbRatingModule, CommonModule],
  templateUrl: './courses-list.component.html',
  styles: ``,
})
export class CoursesListComponent {
  courseList = InstructorCourses
}
