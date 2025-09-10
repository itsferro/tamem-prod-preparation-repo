import { Component } from '@angular/core'
import { CourseData } from '../../data'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'dashboard-selling-courses',
  standalone: true,
  imports: [NgbPaginationModule],
  templateUrl: './selling-courses.component.html',
  styles: ``,
})
export class SellingCoursesComponent {
  courses = CourseData
}
