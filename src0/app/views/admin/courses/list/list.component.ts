import { Component } from '@angular/core'
import { CourseStateComponent } from './compoents/course-state/course-state.component'
import { CourseListComponent } from './compoents/course-list/course-list.component'
import { RouterLink } from '@angular/router'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CourseStateComponent,
    CourseListComponent,
    RouterLink,
    SelectFormInputDirective,
  ],
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent {}
