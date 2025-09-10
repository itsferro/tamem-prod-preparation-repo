import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OtherTopicsComponent } from './other-topics.component'

describe('OtherTopicsComponent', () => {
  let component: OtherTopicsComponent
  let fixture: ComponentFixture<OtherTopicsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherTopicsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(OtherTopicsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
