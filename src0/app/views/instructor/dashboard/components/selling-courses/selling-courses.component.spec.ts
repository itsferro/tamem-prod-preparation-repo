import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SellingCoursesComponent } from './selling-courses.component'

describe('SellingCoursesComponent', () => {
  let component: SellingCoursesComponent
  let fixture: ComponentFixture<SellingCoursesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellingCoursesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SellingCoursesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
