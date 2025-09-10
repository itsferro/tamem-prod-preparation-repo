import { Component, type OnInit } from '@angular/core'
import { MyCourses } from '../../data'
import {
  NgbPaginationModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap'
import aos from 'aos'

@Component({
  selector: 'dashboard-course-list',
  standalone: true,
  imports: [NgbPaginationModule, NgbProgressbarModule],
  templateUrl: './course-list.component.html',
  styles: ``,
})
export class CourseListComponent implements OnInit {
  courseList = MyCourses

  ngOnInit(): void {
    aos.init()
  }
}
