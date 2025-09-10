import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GridItemsComponent } from './grid-items.component'

describe('GridItemsComponent', () => {
  let component: GridItemsComponent
  let fixture: ComponentFixture<GridItemsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridItemsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GridItemsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
