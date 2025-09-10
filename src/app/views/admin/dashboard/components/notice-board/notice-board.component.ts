import { Component } from '@angular/core'
import { NoticeBoardList } from '../../data'
import { SimplebarAngularModule } from 'simplebar-angular'

@Component({
  selector: 'admin-dashboard-notice-board',
  standalone: true,
  imports: [SimplebarAngularModule],
  templateUrl: './notice-board.component.html',
  styles: ``,
})
export class NoticeBoardComponent {
  noticeList = NoticeBoardList
}
