import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { Component } from '@angular/core'
import { InstructorList } from '../../data'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'instructor-list-item',
  standalone: true,
  imports: [SelectFormInputDirective, NgbPaginationModule],
  templateUrl: './list-item.component.html',
  styles: ``,
})
export class ListItemComponent {
  instructors = InstructorList
}
