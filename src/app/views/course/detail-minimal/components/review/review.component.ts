import { Component } from '@angular/core'
import {
  NgbProgressbarModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'minimal-review',
  standalone: true,
  imports: [NgbRatingModule, NgbProgressbarModule],
  templateUrl: './review.component.html',
  styles: ``,
})
export class ReviewComponent {}
