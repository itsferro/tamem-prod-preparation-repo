import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { Component } from '@angular/core'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'checkout-payment-method',
  standalone: true,
  imports: [NgbAccordionModule, SelectFormInputDirective],
  templateUrl: './payment-method.component.html',
  styles: ``,
})
export class PaymentMethodComponent {}
