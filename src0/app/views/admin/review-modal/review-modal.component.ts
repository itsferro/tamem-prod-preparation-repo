import { Component, inject } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-review-modal',
  standalone: true,
  imports: [],
  templateUrl: './review-modal.component.html',
  styles: ``,
})
export class ReviewModalComponent {
  activeModal = inject(NgbActiveModal)
}
