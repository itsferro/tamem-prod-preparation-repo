import { Component, inject, type TemplateRef } from '@angular/core'
import { ReviewList } from '../../data'
import {
  NgbModal,
  NgbPaginationModule,
  NgbRatingModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { DecimalPipe } from '@angular/common'
import { ReviewModalComponent } from '../../../review-modal/review-modal.component'

@Component({
  selector: 'review-list',
  standalone: true,
  imports: [
    NgbRatingModule,
    DecimalPipe,
    NgbPaginationModule,
    NgbTooltipModule,
  ],
  templateUrl: './review-list.component.html',
  styles: ``,
})
export class ReviewListComponent {
  reviews = ReviewList

  public modalService = inject(NgbModal)

  openModal() {
    this.modalService.open(ReviewModalComponent, { centered: true })
  }
}
