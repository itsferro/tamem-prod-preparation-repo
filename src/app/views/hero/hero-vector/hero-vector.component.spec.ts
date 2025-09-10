import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HeroVectorComponent } from './hero-vector.component'

describe('HeroVectorComponent', () => {
  let component: HeroVectorComponent
  let fixture: ComponentFixture<HeroVectorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroVectorComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(HeroVectorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
