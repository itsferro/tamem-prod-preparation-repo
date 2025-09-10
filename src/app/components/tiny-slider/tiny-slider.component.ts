import { BrowserWindowRef } from '@/app/core/service/windowref.service'
import { CommonModule } from '@angular/common'
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { BehaviorSubject, from, Observable, Subject } from 'rxjs'
import { map, take, takeUntil } from 'rxjs/operators'
import { TinySliderInstance, TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'ng-tiny-slider',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="slider-wrapper" [class.ready]="sliderReady$ | async">
    <div class="slide-items" #slideItems>
      <ng-content></ng-content>
    </div>
  </div> `,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './tiny-slider.component.scss',
})
export class TinySliderComponent implements OnInit, OnDestroy {
  @ViewChild('slideItems', { static: true }) slideItemsContainerRef!: ElementRef
  @Input() config: Partial<TinySliderSettings> = {}
  @Input() initManually = false
  @Input() id = ''

  public sliderReady$ = new BehaviorSubject(false)
  public sliderInstance!: TinySliderInstance

  private tns$!: Observable<any>
  private componentDestroy$ = new Subject<boolean>()
  private defaultConfig: Partial<TinySliderSettings> = {
    items: 3,
    mode: 'carousel',
    speed: 400,
    controls: false,
    nav: false,
    navPosition: 'bottom',
    autoplayButtonOutput: false,
  }

  constructor(
    private wr: BrowserWindowRef,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.wr.nativeWindow) {
      this.initTns()

      if (!this.initManually) {
        this.initSlider()
      }
    }
  }

  private initTns() {
    this.tns$ = from(import('tiny-slider/src/tiny-slider'))
    this.tns$.pipe(takeUntil(this.componentDestroy$)).subscribe()
  }

  public initSlider(): void {
    if (this.wr.nativeWindow && this.tns$) {
      const extendConfig = Object.assign(
        { container: this.slideItemsContainerRef.nativeElement },
        { ...this.defaultConfig, ...this.config }
      )

      this.tns$
        .pipe(
          take(1),
          map((item: any) => {
            const tns = item.tns
            this.sliderInstance = tns(extendConfig)
            this.sliderReady$.next(true)
          })
        )
        .subscribe()
    }
  }

  public goTo(target: number | 'next' | 'prev' | 'first' | 'last'): void {
    if (this.wr.nativeWindow) {
      this.sliderInstance.goTo(target)
    }
  }
  public play(): void {
    if (this.wr.nativeWindow) {
      this.sliderInstance.play()
    }
  }
  public pause(): void {
    if (this.wr.nativeWindow) {
      this.sliderInstance.pause()
    }
  }
  public destroy(): void {
    if (this.wr.nativeWindow && this.sliderInstance?.destroy) {
      this.sliderReady$.next(false)
      this.sliderInstance.destroy()
    }
  }

  /**
   * DESTROY
   */
  ngOnDestroy() {
    this.componentDestroy$.next(false)
    this.componentDestroy$.complete()
    this.destroy()
  }
}
