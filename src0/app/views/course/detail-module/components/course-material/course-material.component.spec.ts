import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CourseMaterialComponent } from './course-material.component'

describe('CourseMaterialComponent', () => {
  let component: CourseMaterialComponent
  let fixture: ComponentFixture<CourseMaterialComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseMaterialComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CourseMaterialComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
