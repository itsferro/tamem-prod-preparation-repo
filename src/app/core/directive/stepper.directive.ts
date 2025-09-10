import {
  Directive,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core'
import Stepper from 'bs-stepper'

@Directive({
  selector: '[appStepper]',
  standalone: true,
})
export class StepperDirective implements AfterViewInit {
  private stepper!: Stepper

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.stepper = new Stepper(this.el.nativeElement, {
      linear: false,
      animation: true,
    })
  }

  @HostListener('click', ['$event.target'])
  onClick(target: any) {
    if (target.matches('.next-btn')) {
      this.stepper.next()
    } else if (target.matches('.prev-btn')) {
      this.stepper.previous()
    }
  }
}
