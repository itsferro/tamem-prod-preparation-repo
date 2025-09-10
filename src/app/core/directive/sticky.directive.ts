import {
  Directive,
  OnInit,
  type AfterViewInit,
  type OnDestroy,
} from '@angular/core'
import Sticky from 'sticky-js'

@Directive({
  selector: '[ng-sticky]',
  standalone: true,
})
export class StickyDirective implements AfterViewInit, OnDestroy {
  stickyInstance: any = null

  ngAfterViewInit(): void {
    if (window.innerWidth >= 1200) {
      this.stickyInstance = new Sticky('.sticky-container')
    }
  }

  ngOnDestroy(): void {
    if (this.stickyInstance) this.stickyInstance?.destroy()
  }
}
