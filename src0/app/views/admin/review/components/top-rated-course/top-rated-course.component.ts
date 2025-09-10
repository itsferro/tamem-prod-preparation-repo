import { Component, inject } from '@angular/core'
import { TopRatedList } from '../../data'
import {
  NgbModal,
  NgbPaginationModule,
  NgbRatingModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { DecimalPipe } from '@angular/common'
import { ReviewModalComponent } from '../../../review-modal/review-modal.component'

@Component({
  selector: 'review-top-rated-course',
  standalone: true,
  imports: [
    NgbRatingModule,
    DecimalPipe,
    NgbPaginationModule,
    NgbTooltipModule,
  ],
  templateUrl: './top-rated-course.component.html',
  styles: ``,
})
export class TopRatedCourseComponent {
  ratedList = TopRatedList

  public modalService = inject(NgbModal)

  openModal() {
    this.modalService.open(ReviewModalComponent, { centered: true })
  }
}
