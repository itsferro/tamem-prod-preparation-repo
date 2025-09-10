import { Component } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'minimal-instructor-detail',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './instructor-detail.component.html',
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class InstructorDetailComponent {}
