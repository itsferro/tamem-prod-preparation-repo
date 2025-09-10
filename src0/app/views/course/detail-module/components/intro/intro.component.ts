import { Component, type OnInit } from '@angular/core'
import {
  NgbProgressbarModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import Aos from 'aos'

@Component({
  selector: 'module-intro',
  standalone: true,
  imports: [NgbRatingModule, NgbProgressbarModule],
  templateUrl: './intro.component.html',
  styles: ``,
})
export class IntroComponent implements OnInit {
  ngOnInit(): void {
    Aos.init()
  }
}
