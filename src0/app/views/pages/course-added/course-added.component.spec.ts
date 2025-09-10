import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CourseAddedComponent } from './course-added.component'

describe('CourseAddedComponent', () => {
  let component: CourseAddedComponent
  let fixture: ComponentFixture<CourseAddedComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseAddedComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CourseAddedComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
