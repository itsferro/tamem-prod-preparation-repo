import { Component } from '@angular/core'
import { InstructorList } from '../../data'
import { RouterLink } from '@angular/router'
import { DecimalPipe } from '@angular/common'

@Component({
  selector: 'index11-instructor-grid',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './instructor-grid.component.html',
  styles: ``,
})
export class InstructorGridComponent {
  instructors = InstructorList
}
