import { Component } from '@angular/core'
import {
  NgbPaginationModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap'
import aos from 'aos'
import { MyCourses } from '../dashboard/data'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    NgbPaginationModule,
    NgbProgressbarModule,
    SelectFormInputDirective,
  ],
  templateUrl: './course-list.component.html',
  styles: ``,
})
export class CourseListComponent {
  courseList = MyCourses

  ngOnInit(): void {
    aos.init()
  }
}
