import { Component } from '@angular/core'
import { ArticleList } from '../../data'

@Component({
  selector: 'help-center-articles',
  standalone: true,
  imports: [],
  templateUrl: './articles.component.html',
  styles: ``,
})
export class ArticlesComponent {
  articles = ArticleList
}
