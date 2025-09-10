import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TopInstructorsComponent } from './top-instructors.component'

describe('TopInstructorsComponent', () => {
  let component: TopInstructorsComponent
  let fixture: ComponentFixture<TopInstructorsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopInstructorsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TopInstructorsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
