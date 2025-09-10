import { Component } from '@angular/core'
import { ServiceLists } from '../../data'

@Component({
  selector: 'index8-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styles: ``,
})
export class ServicesComponent {
  services = ServiceLists
}
