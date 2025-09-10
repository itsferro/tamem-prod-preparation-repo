import { Component, inject, type OnInit } from '@angular/core'
import {
  NgbAccordionModule,
  NgbActiveOffcanvas,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap'
import { ProgramList } from '../../data'
import { CommonModule } from '@angular/common'
import Aos from 'aos'

@Component({
  selector: 'minimal-right-sidebar',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule, NgbProgressbarModule],
  templateUrl: './right-sidebar.component.html',
  styles: ``,
})
export class RightSidebarComponent implements OnInit {
  activeOffcanvas = inject(NgbActiveOffcanvas)
  programs = ProgramList

  ngOnInit(): void {
    Aos.init()
  }
}
