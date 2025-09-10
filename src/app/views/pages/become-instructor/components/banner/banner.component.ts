import { Component } from '@angular/core'
import { ScrollToModule, ScrollToService } from '@nicky-lenaers/ngx-scroll-to'

@Component({
  selector: 'become-banner',
  standalone: true,
  imports: [ScrollToModule],
  templateUrl: './banner.component.html',
  styles: ``,
  providers: [ScrollToService],
})
export class BannerComponent {}
