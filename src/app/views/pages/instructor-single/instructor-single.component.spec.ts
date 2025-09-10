import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InstructorSingleComponent } from './instructor-single.component'

describe('InstructorSingleComponent', () => {
  let component: InstructorSingleComponent
  let fixture: ComponentFixture<InstructorSingleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorSingleComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(InstructorSingleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
