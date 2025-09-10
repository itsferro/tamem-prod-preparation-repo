import { Component } from '@angular/core'
import { InstructorList } from '../../data'
import { DecimalPipe } from '@angular/common'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'list-items',
  standalone: true,
  imports: [DecimalPipe, NgbTooltipModule],
  templateUrl: './list-items.component.html',
  styles: ``,
})
export class ListItemsComponent {
  instructors = InstructorList
}
