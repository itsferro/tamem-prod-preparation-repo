import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { Component, inject, type TemplateRef } from '@angular/core'
import { NgbAccordionModule, NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'payment-method',
  standalone: true,
  imports: [NgbAccordionModule, SelectFormInputDirective],
  templateUrl: './payment-method.component.html',
  styles: ``,
})
export class PaymentMethodComponent {
  public modalService = inject(NgbModal)

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content)
  }
}
