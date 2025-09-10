import { Component } from '@angular/core'
import { EarningStateComponent } from './components/earning-state/earning-state.component'
import { InvoiceHistoryComponent } from './components/invoice-history/invoice-history.component'

@Component({
  selector: 'app-earning',
  standalone: true,
  imports: [EarningStateComponent, InvoiceHistoryComponent],
  templateUrl: './earning.component.html',
  styles: ``,
})
export class EarningComponent {}
