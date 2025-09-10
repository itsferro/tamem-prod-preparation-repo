import { Component } from '@angular/core'
import { categoryList } from '../../data'

@Component({
  selector: 'index4-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styles: ``,
})
export class CategoryComponent {
  categoryData = categoryList
}
