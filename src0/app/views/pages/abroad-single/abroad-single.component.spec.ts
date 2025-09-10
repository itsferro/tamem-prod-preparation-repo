import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AbroadSingleComponent } from './abroad-single.component'

describe('AbroadSingleComponent', () => {
  let component: AbroadSingleComponent
  let fixture: ComponentFixture<AbroadSingleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbroadSingleComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AbroadSingleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
