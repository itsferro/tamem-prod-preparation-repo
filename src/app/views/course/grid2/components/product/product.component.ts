import { ProductList } from '@/app/common/product'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'grid2-product',
  standalone: true,
  imports: [NgbRatingModule, CommonModule, NgbPaginationModule],
  templateUrl: './product.component.html',
  styles: ``,
})
export class ProductComponent {
  productData = ProductList
}
