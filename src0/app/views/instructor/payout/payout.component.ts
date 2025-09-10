import { Component } from '@angular/core'
import { StateComponent } from './components/state/state.component'
import { PayoutItemComponent } from './components/payout-item/payout-item.component'

@Component({
  selector: 'app-payout',
  standalone: true,
  imports: [StateComponent, PayoutItemComponent],
  templateUrl: './payout.component.html',
  styles: ``,
})
export class PayoutComponent {}
