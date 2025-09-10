import { Component, inject } from '@angular/core'
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { RightSidebarComponent } from '../right-sidebar/right-sidebar.component'
import { PlyrDirective } from '@/app/core/directive/videoPlayr.directive'

@Component({
  selector: 'minimal-banner',
  standalone: true,
  imports: [PlyrDirective],
  templateUrl: './banner.component.html',
  styles: ``,
})
export class BannerComponent {
  public offcanvasService = inject(NgbOffcanvas)
  openPlaylist() {
    this.offcanvasService.open(RightSidebarComponent, { position: 'end' })
  }
}
