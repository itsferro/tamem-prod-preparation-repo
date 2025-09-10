import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DetailMinimalComponent } from './detail-minimal.component'

describe('DetailMinimalComponent', () => {
  let component: DetailMinimalComponent
  let fixture: ComponentFixture<DetailMinimalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailMinimalComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DetailMinimalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
