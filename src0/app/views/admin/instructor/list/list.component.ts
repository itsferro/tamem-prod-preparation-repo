import { Component } from '@angular/core'
import { NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { ListItemsComponent } from './components/list-items/list-items.component'
import { GridItemsComponent } from './components/grid-items/grid-items.component'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgbNavModule,
    ListItemsComponent,
    GridItemsComponent,
    NgbPaginationModule,
  ],
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent {}
