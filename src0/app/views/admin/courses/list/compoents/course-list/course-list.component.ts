import { Component } from '@angular/core'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { CoursesList } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'course-list',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule],
  templateUrl: './course-list.component.html',
  styles: ``,
})
export class CourseListComponent {
  courses = CoursesList
}
