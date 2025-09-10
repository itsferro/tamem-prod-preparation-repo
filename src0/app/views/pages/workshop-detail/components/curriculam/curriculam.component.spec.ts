import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CurriculamComponent } from './curriculam.component'

describe('CurriculamComponent', () => {
  let component: CurriculamComponent
  let fixture: ComponentFixture<CurriculamComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculamComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CurriculamComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
