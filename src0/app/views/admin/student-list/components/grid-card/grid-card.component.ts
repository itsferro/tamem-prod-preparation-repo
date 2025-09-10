import { Component, type OnInit } from '@angular/core'
import { StudentList } from '../../data'
import { DecimalPipe } from '@angular/common'
import {
  NgbDropdownModule,
  NgbProgressbarModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import Aos from 'aos'

@Component({
  selector: 'grid-card',
  standalone: true,
  imports: [
    DecimalPipe,
    NgbProgressbarModule,
    NgbDropdownModule,
    NgbTooltipModule,
  ],
  templateUrl: './grid-card.component.html',
  styles: ``,
})
export class GridCardComponent implements OnInit {
  students = StudentList

  ngOnInit(): void {
    Aos.init()
  }
}
