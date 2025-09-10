import { Component } from '@angular/core'
import { ScrollToModule, ScrollToService } from '@nicky-lenaers/ngx-scroll-to'

@Component({
  selector: 'become-action-box',
  standalone: true,
  imports: [ScrollToModule],
  templateUrl: './action-box.component.html',
  providers: [ScrollToService],
})
export class ActionBoxComponent {}
