import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OnlineFormComponent } from './online-form.component'

describe('OnlineFormComponent', () => {
  let component: OnlineFormComponent
  let fixture: ComponentFixture<OnlineFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineFormComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(OnlineFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
