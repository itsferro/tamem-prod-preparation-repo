import { Component } from '@angular/core'
import { CurriculamList } from '../../data'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'
import { currency } from '@/app/common/constants'
import { LightgalleryModule } from 'lightgallery/angular'
import lgVideo from 'lightgallery/plugins/video'

@Component({
  selector: 'workshop-curriculam',
  standalone: true,
  imports: [NgbAccordionModule, LightgalleryModule],
  templateUrl: './curriculam.component.html',
  styleUrl: './curriculam.component.scss',
})
export class CurriculamComponent {
  currency = currency
  courseList = CurriculamList

  settings = {
    counter: false,
    plugins: [lgVideo],
    selector: 'a',
    download: false,
  }
}
