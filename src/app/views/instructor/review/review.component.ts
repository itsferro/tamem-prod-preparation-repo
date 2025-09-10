import { Component, type OnInit } from '@angular/core'
import { ReviewList } from './data'
import {
  NgbCollapseModule,
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    NgbPaginationModule,
    NgbRatingModule,
    NgbCollapseModule,
    SelectFormInputDirective,
  ],
  templateUrl: './review.component.html',
  styles: ``,
})
export class ReviewComponent implements OnInit {
  reviews = ReviewList

  ngOnInit(): void {
    this.reviews = ReviewList.map((item, index) => ({
      ...item,
      isCollapse: index !== 0,
    }))
  }
}
