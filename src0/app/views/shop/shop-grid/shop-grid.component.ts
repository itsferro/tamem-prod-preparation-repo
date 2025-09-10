import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { GridContentComponent } from './components/grid-content/grid-content.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-shop-grid',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    GridContentComponent,
    ActionBoxComponent,
    FooterComponent,
  ],
  templateUrl: './shop-grid.component.html',
  styles: ``,
})
export class ShopGridComponent {}
