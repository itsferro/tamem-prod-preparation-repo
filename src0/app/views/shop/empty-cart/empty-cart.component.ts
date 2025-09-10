import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { ContentComponent } from './components/content/content.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-empty-cart',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    ContentComponent,
    FooterComponent,
  ],
  templateUrl: './empty-cart.component.html',
  styles: ``,
})
export class EmptyCartComponent {}
