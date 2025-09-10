import { Component, inject, type OnInit, type TemplateRef } from '@angular/core'
import { CourseDetail } from './data'
import { CommonModule } from '@angular/common'
import {
  NgbAccordionModule,
  NgbProgressbarModule,
  NgbCollapseModule,
  NgbModalModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap'
import aos from 'aos'
import { currency } from '@/app/common/constants'

@Component({
  selector: 'app-course-resume',
  standalone: true,
  imports: [
    CommonModule,
    NgbAccordionModule,
    NgbProgressbarModule,
    NgbCollapseModule,
    NgbModalModule,
  ],
  templateUrl: './course-resume.component.html',
  styles: ``,
})
export class CourseResumeComponent implements OnInit {
  currency = currency
  courses = CourseDetail

  private modalService = inject(NgbModal)

  ngOnInit(): void {
    aos.init()
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, {
      modalDialogClass: 'modal-lg',
      centered: true,
    })
  }
}
