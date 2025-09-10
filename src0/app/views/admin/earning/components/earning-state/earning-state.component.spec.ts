import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EarningStateComponent } from './earning-state.component'

describe('EarningStateComponent', () => {
  let component: EarningStateComponent
  let fixture: ComponentFixture<EarningStateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarningStateComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EarningStateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
