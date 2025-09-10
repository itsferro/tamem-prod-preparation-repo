import { currency } from '@/app/common/constants'
import { Component } from '@angular/core'

@Component({
  selector: 'event-detail-left-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './left-sidebar.component.html',
  styles: ``,
})
export class LeftSidebarComponent {
  currency = currency
}
