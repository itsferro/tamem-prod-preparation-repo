import { Component } from '@angular/core'
import { CountUpModule } from 'ngx-countup'

@Component({
  selector: 'dashboard-counter-state',
  standalone: true,
  imports: [CountUpModule],
  templateUrl: './counter-state.component.html',
  styles: ``,
})
export class CounterStateComponent {}
