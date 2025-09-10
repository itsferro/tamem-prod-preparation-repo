import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RelatedInstructorComponent } from './related-instructor.component'

describe('RelatedInstructorComponent', () => {
  let component: RelatedInstructorComponent
  let fixture: ComponentFixture<RelatedInstructorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedInstructorComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RelatedInstructorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
