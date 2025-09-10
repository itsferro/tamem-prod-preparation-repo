import { CartData } from '@/app/common/cart'
import { Component, EventEmitter, Output, type OnInit } from '@angular/core'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'cart-items',
  standalone: true,
  imports: [NgbAlertModule],
  templateUrl: './cart-items.component.html',
  styles: ``,
})
export class CartItemsComponent implements OnInit {
  cartList = CartData
  showAlert = true
  total = 0

  @Output() totalEvent = new EventEmitter<number>()

  ngOnInit(): void {
    this.cartList.forEach((item) => {
      this.total += item.price
    })

    this.totalEvent.emit(this.total)
  }
}
