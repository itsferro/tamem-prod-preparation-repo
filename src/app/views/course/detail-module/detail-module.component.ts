import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { NgbNavModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import { IntroComponent } from './components/intro/intro.component'
import { CourseMaterialComponent } from './components/course-material/course-material.component'
import { NotesComponent } from './components/notes/notes.component'
import { DiscussionComponent } from './components/discussion/discussion.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-detail-module',
  standalone: true,
  imports: [
    AppMenuComponent,
    IntroComponent,
    NgbNavModule,
    CourseMaterialComponent,
    NotesComponent,
    DiscussionComponent,
    FooterComponent,
  ],
  templateUrl: './detail-module.component.html',
  styles: ``,
})
export class DetailModuleComponent {}
