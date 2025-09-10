import { Component } from '@angular/core'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import { CountUpModule } from 'ngx-countup'

@Component({
  selector: 'index6-banner',
  standalone: true,
  imports: [CountUpModule, NgbRatingModule],
  templateUrl: './banner.component.html',
  styles: ``,
})
export class BannerComponent {}
