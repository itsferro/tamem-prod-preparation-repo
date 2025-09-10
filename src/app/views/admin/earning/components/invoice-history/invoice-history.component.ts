import { Component } from '@angular/core'
import { EarningList } from '../../data'
import { CommonModule } from '@angular/common'
import {
  NgbDropdownModule,
  NgbPaginationModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { currency } from '@/app/common/constants'

@Component({
  selector: 'earning-invoice-history',
  standalone: true,
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbDropdownModule,
    NgbTooltipModule,
  ],
  templateUrl: './invoice-history.component.html',
  styles: ``,
})
export class InvoiceHistoryComponent {
  invoiceHistory = EarningList
  currency = currency
}
