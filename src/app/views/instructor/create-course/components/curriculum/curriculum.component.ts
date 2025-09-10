import { Component, inject, Input, type TemplateRef } from '@angular/core'
import { NgbAccordionModule, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import type Stepper from 'bs-stepper'

@Component({
  selector: 'course-curriculum',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './curriculum.component.html',
  styles: ``,
})
export class CurriculumComponent {
  @Input() stepperInstance?: Stepper

  public modalService = inject(NgbModal)

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content)
  }
}
