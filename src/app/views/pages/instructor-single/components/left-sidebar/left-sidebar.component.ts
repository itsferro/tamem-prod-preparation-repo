import { Component, type OnInit } from '@angular/core'
import {
  NgbProgressbarModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import Aos from 'aos'

@Component({
  selector: 'single-left-sidebar',
  standalone: true,
  imports: [NgbRatingModule, NgbProgressbarModule],
  templateUrl: './left-sidebar.component.html',
  styles: ``,
})
export class LeftSidebarComponent implements OnInit {
  ngOnInit(): void {
    Aos.init()
  }
}
