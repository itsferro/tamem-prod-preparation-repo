import { Component, inject } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-detail-modal',
  standalone: true,
  imports: [],
  templateUrl: './app-detail-modal.component.html',
  styleUrl: './app-detail-modal.component.scss',
})
export class AppDetailModalComponent {
  activeModal = inject(NgbActiveModal)
}
