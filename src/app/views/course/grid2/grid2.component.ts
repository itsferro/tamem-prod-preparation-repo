import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { ProductComponent } from './components/product/product.component'
import { NewsLetterComponent } from './components/news-letter/news-letter.component'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-grid2',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    ProductComponent,
    NewsLetterComponent,
    SelectFormInputDirective,
    FooterComponent,
  ],
  templateUrl: './grid2.component.html',
  styles: ``,
})
export class Grid2Component {}
