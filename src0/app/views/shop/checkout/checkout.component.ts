import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { PersonalDetailComponent } from './components/personal-detail/personal-detail.component'
import { OrderSummaryComponent } from './components/order-summary/order-summary.component'
import { PaymentMethodComponent } from './components/payment-method/payment-method.component'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    PersonalDetailComponent,
    PaymentMethodComponent,
    OrderSummaryComponent,
    NgbAlertModule,
    FooterComponent,
  ],
  templateUrl: './checkout.component.html',
  styles: ``,
})
export class CheckoutComponent {
  showAlert = true
}
