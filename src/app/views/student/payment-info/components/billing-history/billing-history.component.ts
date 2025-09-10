import { Component } from '@angular/core'
import { BillingHistory } from '../../data'
import { CommonModule } from '@angular/common'
import {
  NgbPaginationModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'

@Component({
  selector: 'payment-billing-history',
  standalone: true,
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbTooltipModule,
    SelectFormInputDirective,
  ],
  templateUrl: './billing-history.component.html',
  styles: ``,
})
export class BillingHistoryComponent {
  billingList = BillingHistory
}
