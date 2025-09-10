import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core'
import { ChangeDetectorRef } from '@angular/core'

@Directive({
  selector: '[scrolledTo]',
  exportAs: 'scrolledTo',
  standalone: true,
})
export class ScrolledToDirective implements OnInit {
  @Input() isLast: boolean = false
  focus = false

  constructor(
    public el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.checkScrollPosition()
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkScrollPosition()
  }

  private checkScrollPosition() {
    const elementPosition = this.el.nativeElement.offsetTop
    const elementHeight = this.el.nativeElement.clientHeight

    const scrollPosition = window.scrollY + window.innerHeight / 2

    this.focus =
      scrollPosition >= elementPosition &&
      scrollPosition < elementPosition + elementHeight

    if (window.scrollY === 0) {
      this.focus = this.el.nativeElement.id === 'items-1'
    }

    if (this.isLast) {
      this.focus = scrollPosition >= elementPosition
    }
    this.cdr.detectChanges()
  }
}
