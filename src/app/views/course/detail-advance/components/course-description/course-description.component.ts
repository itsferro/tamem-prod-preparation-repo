import { Component } from '@angular/core'
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'advance-course-description',
  standalone: true,
  imports: [NgbCollapseModule],
  templateUrl: './course-description.component.html',
  styles: ``,
})
export class CourseDescriptionComponent {
  isCollapsed = true
}
