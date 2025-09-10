import { currentYear } from '@/app/common/constants'
import { Component } from '@angular/core'

@Component({
  selector: 'event-detail-organization',
  standalone: true,
  imports: [],
  templateUrl: './organization.component.html',
  styles: ``,
})
export class OrganizationComponent {
  currentYear = currentYear
}
