import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EarningChartComponent } from './earning-chart.component'

describe('EarningChartComponent', () => {
  let component: EarningChartComponent
  let fixture: ComponentFixture<EarningChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarningChartComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EarningChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
