import { currentYear } from '@/app/common/constants'
import { Component } from '@angular/core'

@Component({
  selector: 'index9-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styles: ``,
})
export class BannerComponent {
  currentYear = currentYear
}
