import { Component } from '@angular/core'
import { BlogList } from '../../data'
import { DecimalPipe } from '@angular/common'

@Component({
  selector: 'index9-blog',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './blog.component.html',
  styles: ``,
})
export class BlogComponent {
  allBlogList = BlogList
}
