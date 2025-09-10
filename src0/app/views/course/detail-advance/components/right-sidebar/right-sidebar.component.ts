import { currency } from '@/app/common/constants'
import { Component } from '@angular/core'
import { NgbDropdownModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'advance-right-sidebar',
  standalone: true,
  imports: [NgbDropdownModule, NgbRatingModule],
  templateUrl: './right-sidebar.component.html',
  styles: ``,
})
export class RightSidebarComponent {
  currency = currency
}
