import { currency } from '@/app/common/constants'
import { Component } from '@angular/core'
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'earning-state',
  standalone: true,
  imports: [NgbPopoverModule],
  templateUrl: './earning-state.component.html',
  styles: ``,
})
export class EarningStateComponent {
  currency = currency
}
