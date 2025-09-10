import { credits, currentYear } from '@/app/common/constants'
import {
  CommunityList,
  CompanyList,
  LanguageList,
  SocialList,
  TeachingList,
} from '@/app/common/footer-item'
import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, RouterModule],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  credits = credits
  currentYear = currentYear
  @Input() mode: string = ''
  @Input() className: string = ''

  companies = CompanyList
  communities = CommunityList
  teaching = TeachingList
  languages = LanguageList
  socials = SocialList
}
