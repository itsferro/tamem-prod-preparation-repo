import { Component, inject } from '@angular/core'
import { InstructorRequests } from './data'
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { AppDetailModalComponent } from './components/app-detail-modal/app-detail-modal.component'

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, SelectFormInputDirective],
  templateUrl: './request.component.html',
  styles: ``,
})
export class RequestComponent {
  requests = InstructorRequests

  public modalService = inject(NgbModal)

  openModal() {
    this.modalService.open(AppDetailModalComponent, {
      centered: true,
      size: 'lg',
    })
  }
}
