import { Component, type OnInit } from '@angular/core'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import Aos from 'aos'

@Component({
  selector: 'about-founder',
  standalone: true,
  imports: [NgbProgressbarModule],
  templateUrl: './founder.component.html',
  styles: ``,
})
export class FounderComponent implements OnInit {
  ngOnInit(): void {
    Aos.init()
  }
}
