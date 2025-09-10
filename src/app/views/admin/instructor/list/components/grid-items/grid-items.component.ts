import { DecimalPipe } from '@angular/common'
import { Component } from '@angular/core'
import {
  NgbDropdownModule,
  NgbRatingModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { InstructorList } from '../../data'

@Component({
  selector: 'grid-items',
  standalone: true,
  imports: [NgbRatingModule, DecimalPipe, NgbDropdownModule, NgbTooltipModule],
  templateUrl: './grid-items.component.html',
  styles: ``,
})
export class GridItemsComponent {
  instructors = InstructorList
}
