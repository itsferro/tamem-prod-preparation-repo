import { Route } from '@angular/router'
import { ShopGridComponent } from './shop-grid/shop-grid.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { CartComponent } from './cart/cart.component'
import { CheckoutComponent } from './checkout/checkout.component'
import { EmptyCartComponent } from './empty-cart/empty-cart.component'
import { WishlistComponent } from './wishlist/wishlist.component'

export const SHOP_ROUTES: Route[] = [
  { path: '', component: ShopGridComponent, data: { title: 'Shop Grid' } },
  {
    path: 'product-detail',
    component: ProductDetailComponent,
    data: { title: 'Product Detail' },
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { title: 'Cart' },
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { title: 'Checkout' },
  },
  {
    path: 'empty-cart',
    component: EmptyCartComponent,
    data: { title: 'Empty Cart' },
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    data: { title: 'Wishlist' },
  },
]
