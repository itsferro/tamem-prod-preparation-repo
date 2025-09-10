import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SocialSettingComponent } from './social-setting.component'

describe('SocialSettingComponent', () => {
  let component: SocialSettingComponent
  let fixture: ComponentFixture<SocialSettingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialSettingComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SocialSettingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
