import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SocialMediaProfileComponent } from './social-media-profile.component'

describe('SocialMediaProfileComponent', () => {
  let component: SocialMediaProfileComponent
  let fixture: ComponentFixture<SocialMediaProfileComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaProfileComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SocialMediaProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
