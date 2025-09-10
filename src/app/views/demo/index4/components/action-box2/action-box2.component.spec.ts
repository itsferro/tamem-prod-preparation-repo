import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ActionBox2Component } from './action-box2.component'

describe('ActionBox2Component', () => {
  let component: ActionBox2Component
  let fixture: ComponentFixture<ActionBox2Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionBox2Component],
    }).compileComponents()

    fixture = TestBed.createComponent(ActionBox2Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
