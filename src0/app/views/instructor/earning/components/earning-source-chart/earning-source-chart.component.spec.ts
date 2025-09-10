import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EarningSourceChartComponent } from './earning-source-chart.component'

describe('EarningSourceChartComponent', () => {
  let component: EarningSourceChartComponent
  let fixture: ComponentFixture<EarningSourceChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarningSourceChartComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EarningSourceChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
