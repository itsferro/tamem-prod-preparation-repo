import { Component, type OnInit } from '@angular/core'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import aos from 'aos'

@Component({
  selector: 'app-comingsoon',
  standalone: true,
  imports: [NgbProgressbarModule],
  templateUrl: './comingsoon.component.html',
  styles: ``,
})
export class ComingsoonComponent implements OnInit {
  ngOnInit(): void {
    aos.init()
  }
}
