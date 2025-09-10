import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ListedCollegeComponent } from './listed-college.component'

describe('ListedCollegeComponent', () => {
  let component: ListedCollegeComponent
  let fixture: ComponentFixture<ListedCollegeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListedCollegeComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ListedCollegeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
