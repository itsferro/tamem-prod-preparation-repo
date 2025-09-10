import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { CartItemsComponent } from './components/cart-items/cart-items.component'
import { CartTotalComponent } from './components/cart-total/cart-total.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    CartItemsComponent,
    CartTotalComponent,
    FooterComponent,
  ],
  templateUrl: './cart.component.html',
  styles: ``,
})
export class CartComponent {
  total: number = 0

  getTotal($event: number) {
    this.total = $event
  }
}
