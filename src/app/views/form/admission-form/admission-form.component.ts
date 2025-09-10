import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { EducationComponent } from './components/education/education.component'
import { ParentDetailComponent } from './components/parent-detail/parent-detail.component'
import { PersonalInfoComponent } from './components/personal-info/personal-info.component'
import { Footer2Component } from '@/app/components/footers/footer2/footer2.component'
import { currency } from '@/app/common/constants'

@Component({
  selector: 'app-admission-form',
  standalone: true,
  imports: [
    AppMenuComponent,
    PersonalInfoComponent,
    ParentDetailComponent,
    EducationComponent,
    Footer2Component,
  ],
  templateUrl: './admission-form.component.html',
  styles: ``,
})
export class AdmissionFormComponent {
  currency = currency
}
