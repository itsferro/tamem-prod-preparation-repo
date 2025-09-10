import { currency, currentYear } from '@/app/common/constants'
import { Component, type OnInit } from '@angular/core'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import aos from 'aos'

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [NgbProgressbarModule],
  templateUrl: './subscription.component.html',
  styles: ``,
})
export class SubscriptionComponent implements OnInit {
  currency = currency
  currentYear = currentYear

  ngOnInit(): void {
    aos.init()
  }
}
