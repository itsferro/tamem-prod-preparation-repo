import { DecimalPipe } from '@angular/common'
import { Component } from '@angular/core'
import {
  NgbProgressbarModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { StudentList } from '../../data'
import Aos from 'aos'

@Component({
  selector: 'list-card',
  standalone: true,
  imports: [DecimalPipe, NgbProgressbarModule, NgbTooltipModule],
  templateUrl: './list-card.component.html',
  styles: ``,
})
export class ListCardComponent {
  students = StudentList

  ngOnInit(): void {
    Aos.init()
  }
}
