import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { Component, inject, type TemplateRef } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'module-discussion',
  standalone: true,
  imports: [SelectFormInputDirective],
  templateUrl: './discussion.component.html',
  styles: ``,
})
export class DiscussionComponent {
  public modalService = inject(NgbModal)

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content)
  }
}
