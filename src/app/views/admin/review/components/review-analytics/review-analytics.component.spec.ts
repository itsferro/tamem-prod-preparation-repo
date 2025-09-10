import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ReviewAnalyticsComponent } from './review-analytics.component'

describe('ReviewAnalyticsComponent', () => {
  let component: ReviewAnalyticsComponent
  let fixture: ComponentFixture<ReviewAnalyticsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewAnalyticsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ReviewAnalyticsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
