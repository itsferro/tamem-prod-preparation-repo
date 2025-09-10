import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { Component, inject, type TemplateRef } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'course-additional-info',
  standalone: true,
  imports: [SelectFormInputDirective, RouterLink],
  templateUrl: './additional-info.component.html',
  styles: ``,
})
export class AdditionalInfoComponent {
  public modalService = inject(NgbModal)

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content)
  }
}
