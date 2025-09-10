import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LinkedAccountComponent } from './linked-account.component'

describe('LinkedAccountComponent', () => {
  let component: LinkedAccountComponent
  let fixture: ComponentFixture<LinkedAccountComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedAccountComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LinkedAccountComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
