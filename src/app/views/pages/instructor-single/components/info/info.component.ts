import { credits } from '@/app/common/constants'
import { Component } from '@angular/core'

@Component({
  selector: 'single-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styles: ``,
})
export class InfoComponent {
  credits = credits
}
