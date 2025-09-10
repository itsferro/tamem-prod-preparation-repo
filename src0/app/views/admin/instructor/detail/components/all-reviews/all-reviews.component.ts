import { Component, inject, type TemplateRef } from '@angular/core'
import { ReviewList } from '../../data'
import {
  NgbModal,
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { ReviewModalComponent } from '@/app/views/admin/review-modal/review-modal.component'

@Component({
  selector: 'instructor-detail-all-reviews',
  standalone: true,
  imports: [NgbRatingModule, NgbPaginationModule],
  templateUrl: './all-reviews.component.html',
  styles: ``,
})
export class AllReviewsComponent {
  reviews = ReviewList

  public modalService = inject(NgbModal)

  openModal() {
    this.modalService.open(ReviewModalComponent, { centered: true })
  }
}
