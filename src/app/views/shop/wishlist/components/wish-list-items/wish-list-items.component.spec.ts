import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WishListItemsComponent } from './wish-list-items.component'

describe('WishListItemsComponent', () => {
  let component: WishListItemsComponent
  let fixture: ComponentFixture<WishListItemsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishListItemsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WishListItemsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
