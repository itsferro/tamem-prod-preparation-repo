import { credits } from '@/app/common/constants'
import { Component } from '@angular/core'

@Component({
  selector: 'admin-dashboard-support-request',
  standalone: true,
  imports: [],
  templateUrl: './support-request.component.html',
  styles: ``,
})
export class SupportRequestComponent {
  credits = credits
}
