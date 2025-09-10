import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CourseStateComponent } from './course-state.component'

describe('CourseStateComponent', () => {
  let component: CourseStateComponent
  let fixture: ComponentFixture<CourseStateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseStateComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CourseStateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
