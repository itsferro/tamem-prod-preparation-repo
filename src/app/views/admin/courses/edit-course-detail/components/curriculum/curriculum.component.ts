import { Component, inject, type TemplateRef } from '@angular/core'
import { NgbAccordionModule, NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'edit-course-curriculum',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './curriculum.component.html',
  styles: ``,
})
export class CurriculumComponent {
  public modalService = inject(NgbModal)

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content)
  }
}
