import { CartData } from '@/app/common/cart'
import { Component, type OnInit } from '@angular/core'

@Component({
  selector: 'checkout-order-summary',
  standalone: true,
  imports: [],
  templateUrl: './order-summary.component.html',
  styles: ``,
})
export class OrderSummaryComponent implements OnInit {
  cartList = CartData
  total = 0
  discount = 20
  netAmount = 0

  ngOnInit(): void {
    this.cartList.forEach((item) => {
      this.total += item.price
    })

    this.netAmount = this.total - this.discount
  }
}
