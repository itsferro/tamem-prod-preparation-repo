import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StudentChartsComponent } from './student-charts.component'

describe('StudentChartsComponent', () => {
  let component: StudentChartsComponent
  let fixture: ComponentFixture<StudentChartsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentChartsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(StudentChartsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
