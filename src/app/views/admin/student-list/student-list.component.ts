import { Component, type OnInit } from '@angular/core'
import { StudentList } from './data'
import { DecimalPipe } from '@angular/common'
import {
  NgbNavModule,
  NgbPaginationModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap'
import aos from 'aos'
import { ListCardComponent } from './components/list-card/list-card.component'
import { GridCardComponent } from './components/grid-card/grid-card.component'

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    DecimalPipe,
    NgbPaginationModule,
    NgbNavModule,
    ListCardComponent,
    GridCardComponent,
  ],
  templateUrl: './student-list.component.html',
  styles: ``,
})
export class StudentListComponent {}
