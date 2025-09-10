import { Component } from '@angular/core'
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'index2-top-header',
  standalone: true,
  imports: [NgbDropdownModule, NgbTooltipModule],
  templateUrl: './top-header.component.html',
  styles: ``,
})
export class TopHeaderComponent {}
