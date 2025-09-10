import { currency } from '@/app/common/constants'
import { Component } from '@angular/core'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'product-info',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './product-info.component.html',
  styles: ``,
})
export class ProductInfoComponent {
  currency = currency
}
