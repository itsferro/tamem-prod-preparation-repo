import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Index11Component } from './index11.component'

describe('Index11Component', () => {
  let component: Index11Component
  let fixture: ComponentFixture<Index11Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Index11Component],
    }).compileComponents()

    fixture = TestBed.createComponent(Index11Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
