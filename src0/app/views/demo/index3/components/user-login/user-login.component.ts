import { Component, type OnInit } from '@angular/core'
import {
  NgbDropdownModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap'
import Aos from 'aos'

@Component({
  selector: 'index3-user-login',
  standalone: true,
  imports: [NgbDropdownModule, NgbProgressbarModule],
  templateUrl: './user-login.component.html',
  styles: ``,
})
export class UserLoginComponent implements OnInit {
  ngOnInit(): void {
    Aos.init()
  }
}
