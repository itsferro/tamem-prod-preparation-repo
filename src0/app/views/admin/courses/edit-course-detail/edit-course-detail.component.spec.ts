import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditCourseDetailComponent } from './edit-course-detail.component'

describe('EditCourseDetailComponent', () => {
  let component: EditCourseDetailComponent
  let fixture: ComponentFixture<EditCourseDetailComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCourseDetailComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EditCourseDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
