import { Component, inject } from '@angular/core'
import {
  NgbActiveOffcanvas,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'grid-right-sidebar',
  standalone: true,
  imports: [NgbCollapseModule],
  templateUrl: './right-sidebar.component.html',
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class RightSidebarComponent {
  activeOffcanvas = inject(NgbActiveOffcanvas)

  isCollapsed = true
}
