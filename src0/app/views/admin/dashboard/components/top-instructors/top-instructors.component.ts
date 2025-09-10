import { Component } from '@angular/core'
import { InstructorsList } from '../../data'

@Component({
  selector: 'admin-dashboard-top-instructors',
  standalone: true,
  imports: [],
  templateUrl: './top-instructors.component.html',
  styles: ``,
})
export class TopInstructorsComponent {
  instructors = InstructorsList
}
