import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CourseFAQComponent } from './course-faq.component'

describe('CourseFAQComponent', () => {
  let component: CourseFAQComponent
  let fixture: ComponentFixture<CourseFAQComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseFAQComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CourseFAQComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
