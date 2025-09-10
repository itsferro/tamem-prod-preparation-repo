import { Component } from '@angular/core'
import { PaymentMethodComponent } from './components/payment-method/payment-method.component'
import { BillingHistoryComponent } from './components/billing-history/billing-history.component'
import { BillingAddressComponent } from './components/billing-address/billing-address.component'

@Component({
  selector: 'app-payment-info',
  standalone: true,
  imports: [
    PaymentMethodComponent,
    BillingHistoryComponent,
    BillingAddressComponent,
  ],
  templateUrl: './payment-info.component.html',
  styles: ``,
})
export class PaymentInfoComponent {}
