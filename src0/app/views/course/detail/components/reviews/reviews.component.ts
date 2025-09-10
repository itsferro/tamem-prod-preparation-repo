import { Component } from '@angular/core'
import {
  NgbProgressbarModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'detail-reviews',
  standalone: true,
  imports: [NgbRatingModule, NgbProgressbarModule],
  templateUrl: './reviews.component.html',
  styles: ``,
})
export class ReviewsComponent {}
