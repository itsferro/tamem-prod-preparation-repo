import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component, inject } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { ProductComponent } from './components/product/product.component'
import { NewsLetterComponent } from './components/news-letter/news-letter.component'
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    ProductComponent,
    NewsLetterComponent,
    RightSidebarComponent,
    SelectFormInputDirective,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './list.component.html',
  providers: [NgbActiveOffcanvas],
})
export class ListComponent {
  public offcanvasService = inject(NgbOffcanvas)

  openFilter() {
    this.offcanvasService.open(RightSidebarComponent, { position: 'end' })
  }
}
