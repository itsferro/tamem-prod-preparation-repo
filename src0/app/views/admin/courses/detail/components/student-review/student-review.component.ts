import { Component, inject, type TemplateRef } from '@angular/core'
import { StudentReviewList } from '../../data'
import {
  NgbModal,
  NgbModalModule,
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { ReviewModalComponent } from '@/app/views/admin/review-modal/review-modal.component'

@Component({
  selector: 'detail-student-review',
  standalone: true,
  imports: [NgbRatingModule, NgbPaginationModule, NgbModalModule],
  templateUrl: './student-review.component.html',
  styles: ``,
})
export class StudentReviewComponent {
  reviewList = StudentReviewList

  public modalService = inject(NgbModal)

  openModal() {
    this.modalService.open(ReviewModalComponent, { centered: true })
  }
}
