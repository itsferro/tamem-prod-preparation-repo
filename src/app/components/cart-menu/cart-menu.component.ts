import { CartData } from '@/app/common/cart'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { Component, Input } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-cart-menu',
  standalone: true,
  imports: [NgbDropdownModule, SelectFormInputDirective],
  templateUrl: './cart-menu.component.html',
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class CartMenuComponent {
  @Input() btnClass!: string
  @Input() icon!: string
  @Input() badgeClass!: string

  CartList = CartData
}
