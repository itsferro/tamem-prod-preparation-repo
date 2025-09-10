import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HelpCenterDetailComponent } from './help-center-detail.component'

describe('HelpCenterDetailComponent', () => {
  let component: HelpCenterDetailComponent
  let fixture: ComponentFixture<HelpCenterDetailComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpCenterDetailComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(HelpCenterDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
