import { currency } from '@/app/common/constants'
import { Component } from '@angular/core'

@Component({
  selector: 'index5-latest-news',
  standalone: true,
  imports: [],
  templateUrl: './latest-news.component.html',
  styles: ``,
})
export class LatestNewsComponent {
  currency = currency
}
