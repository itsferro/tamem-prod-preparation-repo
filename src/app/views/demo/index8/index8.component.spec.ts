import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Index8Component } from './index8.component'

describe('Index8Component', () => {
  let component: Index8Component
  let fixture: ComponentFixture<Index8Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Index8Component],
    }).compileComponents()

    fixture = TestBed.createComponent(Index8Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
