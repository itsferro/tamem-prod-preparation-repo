import { Component } from '@angular/core'
import { GridList } from '../../data'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'grid',
  standalone: true,
  imports: [NgbPaginationModule],
  templateUrl: './grid.component.html',
  styles: ``,
})
export class GridComponent {
  gridList = GridList
}
