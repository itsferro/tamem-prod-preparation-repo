import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { CommonModule, DecimalPipe } from '@angular/common'
import { Component } from '@angular/core'
import {
  NgbDropdownModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap'
import { PayoutList } from '../../data'
import { currency } from '@/app/common/constants'

@Component({
  selector: 'payout-item',
  standalone: true,
  imports: [
    SelectFormInputDirective,
    NgbPaginationModule,
    DecimalPipe,
    CommonModule,
    NgbDropdownModule,
  ],
  templateUrl: './payout-item.component.html',
  styles: ``,
  providers: [DecimalPipe],
})
export class PayoutItemComponent {
  payoutData = PayoutList
  currency = currency
}
