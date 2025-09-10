import { Component } from '@angular/core'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'index1-reviews',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './reviews.component.html',
  styles: ``,
})
export class ReviewsComponent {}
