import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core'
import Plyr from 'plyr'

@Directive({
  selector: '[appPlyr]',
  standalone: true,
})
export class PlyrDirective implements OnInit, OnDestroy {
  @Input() plyrOptions!: Plyr.Options
  private player!: Plyr

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.player = new Plyr(this.el.nativeElement, this.plyrOptions)
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.destroy()
    }
  }
}
