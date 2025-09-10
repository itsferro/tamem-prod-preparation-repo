import { Component } from '@angular/core'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'request-access-banner',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './banner.component.html',
  styles: ``,
})
export class BannerComponent {}
