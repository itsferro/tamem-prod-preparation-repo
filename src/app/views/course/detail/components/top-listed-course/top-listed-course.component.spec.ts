import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TopListedCourseComponent } from './top-listed-course.component'

describe('TopListedCourseComponent', () => {
  let component: TopListedCourseComponent
  let fixture: ComponentFixture<TopListedCourseComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopListedCourseComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TopListedCourseComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
