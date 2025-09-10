import { Component } from '@angular/core'
import { OrderList } from './data'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [SelectFormInputDirective, NgbPaginationModule],
  templateUrl: './order.component.html',
  styles: ``,
})
export class OrderComponent {
  orderData = OrderList
}
