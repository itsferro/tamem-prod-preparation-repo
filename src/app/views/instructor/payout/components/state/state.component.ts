import { currency, currentYear } from '@/app/common/constants'
import { Component } from '@angular/core'

@Component({
  selector: 'payout-state',
  standalone: true,
  imports: [],
  templateUrl: './state.component.html',
  styles: ``,
})
export class StateComponent {
  currency = currency
  currentYear = currentYear
}
