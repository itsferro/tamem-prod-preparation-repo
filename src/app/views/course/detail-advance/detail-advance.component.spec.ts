import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DetailAdvanceComponent } from './detail-advance.component'

describe('DetailAdvanceComponent', () => {
  let component: DetailAdvanceComponent
  let fixture: ComponentFixture<DetailAdvanceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAdvanceComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DetailAdvanceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
