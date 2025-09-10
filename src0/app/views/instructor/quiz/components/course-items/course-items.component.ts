import { Component, inject, type TemplateRef } from '@angular/core'
import {
  NgbAccordionModule,
  NgbModal,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap'
import { Courses } from '../../data'

@Component({
  selector: 'quiz-course-items',
  standalone: true,
  imports: [NgbAccordionModule, NgbModalModule],
  templateUrl: './course-items.component.html',
  styles: ``,
})
export class CourseItemsComponent {
  courseList = Courses

  public modalService = inject(NgbModal)

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content)
  }
}
