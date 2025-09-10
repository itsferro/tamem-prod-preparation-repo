import { Component } from '@angular/core'
import { Curriculum } from '../../data'
import { CommonModule } from '@angular/common'
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'advance-course-curriculum',
  standalone: true,
  imports: [CommonModule, NgbCollapseModule],
  templateUrl: './course-curriculum.component.html',
  styles: ``,
})
export class CourseCurriculumComponent {
  curriculumList = Curriculum
  isCollapsed = true
}
