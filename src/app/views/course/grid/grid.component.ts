import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component, inject } from '@angular/core'
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component'
import { NewsLetterComponent } from './components/news-letter/news-letter.component'
import { ProductsComponent } from './components/products/products.component'
import { BannerComponent } from './components/banner/banner.component'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    AppMenuComponent,
    RightSidebarComponent,
    NewsLetterComponent,
    ProductsComponent,
    BannerComponent,
    SelectFormInputDirective,
    FooterComponent,
  ],
  templateUrl: './grid.component.html',
  styles: ``,
  providers: [NgbActiveOffcanvas],
})
export class GridComponent {
  public offcanvasService = inject(NgbOffcanvas)

  openFilter() {
    this.offcanvasService.open(RightSidebarComponent, { position: 'end' })
  }
}
