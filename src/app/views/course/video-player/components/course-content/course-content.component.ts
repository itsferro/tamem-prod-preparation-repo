import { Component, inject, type TemplateRef } from '@angular/core'
import { CourseContent } from '../../data'
import {
  NgbAccordionModule,
  NgbCollapseModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'video-course-content',
  standalone: true,
  imports: [NgbAccordionModule, NgbCollapseModule, CommonModule, RouterLink],
  templateUrl: './course-content.component.html',
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class CourseContentComponent {
  courseList = CourseContent

  public modalService = inject(NgbModal)

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content)
  }
}
