import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Index10Component } from './index10.component'

describe('Index10Component', () => {
  let component: Index10Component
  let fixture: ComponentFixture<Index10Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Index10Component],
    }).compileComponents()

    fixture = TestBed.createComponent(Index10Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
