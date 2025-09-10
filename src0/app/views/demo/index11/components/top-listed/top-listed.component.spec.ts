import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TopListedComponent } from './top-listed.component'

describe('TopListedComponent', () => {
  let component: TopListedComponent
  let fixture: ComponentFixture<TopListedComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopListedComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TopListedComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
