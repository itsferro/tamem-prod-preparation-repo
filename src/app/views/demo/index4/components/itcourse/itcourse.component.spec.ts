import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ITCourseComponent } from './itcourse.component'

describe('ITCourseComponent', () => {
  let component: ITCourseComponent
  let fixture: ComponentFixture<ITCourseComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ITCourseComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ITCourseComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
