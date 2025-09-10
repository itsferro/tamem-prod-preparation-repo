import { Component } from '@angular/core'
import { CourseList } from '../../data'
import { CommonModule } from '@angular/common'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'instructor-detail-courses-list',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  templateUrl: './courses-list.component.html',
  styles: ``,
})
export class CoursesListComponent {
  courses = CourseList
}
