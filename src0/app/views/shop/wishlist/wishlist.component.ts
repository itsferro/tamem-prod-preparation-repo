import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { WishListItemsComponent } from './components/wish-list-items/wish-list-items.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    WishListItemsComponent,
    FooterComponent,
  ],
  templateUrl: './wishlist.component.html',
  styles: ``,
})
export class WishlistComponent {}
