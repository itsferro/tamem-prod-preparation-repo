import { Component } from '@angular/core'
import { CourseList } from './data'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'

@Component({
  selector: 'app-manage-course',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, SelectFormInputDirective],
  templateUrl: './manage-course.component.html',
  styles: ``,
})
export class ManageCourseComponent {
  courses = CourseList
}
