import { Component, Input, type OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'cart-total',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-total.component.html',
  styles: ``,
})
export class CartTotalComponent implements OnInit {
  @Input() total: number = 0
  discount = 20
  netAmount = 0

  ngOnInit(): void {
    this.netAmount = this.total - 20
  }
}
