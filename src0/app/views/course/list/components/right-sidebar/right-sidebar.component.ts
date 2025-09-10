import { Component, inject } from '@angular/core'
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'list-right-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './right-sidebar.component.html',
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class RightSidebarComponent {
  activeOffcanvas = inject(NgbActiveOffcanvas)

}
