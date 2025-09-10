import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TrendingCourseComponent } from './trending-course.component'

describe('TrendingCourseComponent', () => {
  let component: TrendingCourseComponent
  let fixture: ComponentFixture<TrendingCourseComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingCourseComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TrendingCourseComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
