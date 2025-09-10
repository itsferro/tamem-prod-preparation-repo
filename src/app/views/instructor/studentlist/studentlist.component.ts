import { Component, type OnInit } from '@angular/core'
import { StudentList } from './data'
import {
  NgbPaginationModule,
  NgbProgressbarModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import aos from 'aos'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'

@Component({
  selector: 'app-studentlist',
  standalone: true,
  imports: [
    NgbProgressbarModule,
    NgbPaginationModule,
    SelectFormInputDirective,
    NgbTooltipModule,
  ],
  templateUrl: './studentlist.component.html',
  styles: ``,
})
export class StudentlistComponent implements OnInit {
  studentsData = StudentList

  ngOnInit(): void {
    aos.init()
  }
}
