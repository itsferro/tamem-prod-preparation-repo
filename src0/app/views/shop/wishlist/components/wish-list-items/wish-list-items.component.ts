import { Component } from '@angular/core'
import { WishList } from '../../data'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'wishlist-items',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './wish-list-items.component.html',
  styles: ``,
})
export class WishListItemsComponent {
  wishlistData = WishList
}
