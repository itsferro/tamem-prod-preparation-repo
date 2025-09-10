import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import { Component } from '@angular/core'
import { AwardsList, TeamList } from '../../data'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import type { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'about-award',
  standalone: true,
  imports: [TinySliderComponent, NgbRatingModule],
  templateUrl: './award.component.html',
  styles: ``,
})
export class AwardComponent {
  awards = AwardsList
  teamData = TeamList

  sliderConfig: TinySliderSettings = {
    autoplay: true,
    arrowKeys: true,
    controls: true,
    controlsText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    responsive: {
      0: { items: 2 },
      768: { items: 2 },
      992: { items: 3 },
      1200: { items: 4 },
    },
  }
}
