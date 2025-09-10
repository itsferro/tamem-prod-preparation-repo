import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { OnlineFormComponent } from './components/online-form/online-form.component'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import { Footer2Component } from '@/app/components/footers/footer2/footer2.component'

@Component({
  selector: 'app-book-class',
  standalone: true,
  imports: [
    AppMenuComponent,
    OnlineFormComponent,
    NgbRatingModule,
    Footer2Component,
  ],
  templateUrl: './book-class.component.html',
  styles: ``,
})
export class BookClassComponent {}
