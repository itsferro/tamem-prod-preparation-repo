import { Component } from '@angular/core'
import { BookmarkList } from './data'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './bookmark.component.html',
  styles: ``,
})
export class BookmarkComponent {
  wishlist = BookmarkList
}
