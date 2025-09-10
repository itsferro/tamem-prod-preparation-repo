import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TopRatedCourseComponent } from './top-rated-course.component'

describe('TopRatedCourseComponent', () => {
  let component: TopRatedCourseComponent
  let fixture: ComponentFixture<TopRatedCourseComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRatedCourseComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TopRatedCourseComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
