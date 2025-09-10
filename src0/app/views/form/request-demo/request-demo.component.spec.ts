import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RequestDEmoComponent } from './request-demo.component'

describe('RequestDEmoComponent', () => {
  let component: RequestDEmoComponent
  let fixture: ComponentFixture<RequestDEmoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDEmoComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RequestDEmoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
