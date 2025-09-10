import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PopularCourseComponent } from './popular-course.component'

describe('PopularCourseComponent', () => {
  let component: PopularCourseComponent
  let fixture: ComponentFixture<PopularCourseComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularCourseComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PopularCourseComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
