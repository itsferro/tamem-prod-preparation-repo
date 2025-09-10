import { Component, HostListener, ElementRef, Renderer2 } from '@angular/core'
import { TopbarComponent } from './components/topbar/topbar.component'
import { VideoComponent } from './components/video/video.component'
import { BannerComponent } from './components/banner/banner.component'
import { CategoryComponent } from './components/category/category.component'
import { FeatureComponent } from './components/feature/feature.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { ITCourseComponent } from './components/itcourse/itcourse.component'
import { LiveCourseComponent } from './components/live-course/live-course.component'
import { ActionBox2Component } from './components/action-box2/action-box2.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-index4',
  standalone: true,
  imports: [
    TopbarComponent,
    BannerComponent,
    VideoComponent,
    CategoryComponent,
    FeatureComponent,
    ActionBoxComponent,
    ITCourseComponent,
    LiveCourseComponent,
    ActionBox2Component,
    FooterComponent,
    NgbAlertModule,
  ],
  templateUrl: './index4.component.html',
  styles: ``,
})
export class Index4Component {
  showAlert = true
  private scrollPos = 0
  private readonly scrollThreshold = 800

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    var alertBox = document.querySelector('.sticky-element')
    this.scrollPos = window.scrollY
    if (this.scrollPos >= this.scrollThreshold) {
      this.renderer.addClass(alertBox, 'sticky-element-sticked')
    } else {
      this.renderer.removeClass(alertBox, 'sticky-element-sticked')
    }
  }
}
