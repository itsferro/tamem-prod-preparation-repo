import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component'
import { ProductInfoComponent } from './components/product-info/product-info.component'
import { BookDetailComponent } from './components/book-detail/book-detail.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'
import { StickyDirective } from '@/app/core/directive/sticky.directive'

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    AppMenuComponent,
    LeftSidebarComponent,
    ProductInfoComponent,
    BookDetailComponent,
    FooterComponent,
    StickyDirective,
  ],
  templateUrl: './product-detail.component.html',
  styles: ``,
})
export class ProductDetailComponent {}
