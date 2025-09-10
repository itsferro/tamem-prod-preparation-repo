import { Component } from '@angular/core'
import {
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { ProductList } from '@/app/common/product'

@Component({
  selector: 'grid-products',
  standalone: true,
  imports: [NgbRatingModule, CommonModule, NgbPaginationModule],
  templateUrl: './products.component.html',
  styles: ``,
})
export class ProductsComponent {
  productsData = ProductList
}
