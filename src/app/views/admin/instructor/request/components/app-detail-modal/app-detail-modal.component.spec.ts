import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AppDetailModalComponent } from './app-detail-modal.component'

describe('AppDetailModalComponent', () => {
  let component: AppDetailModalComponent
  let fixture: ComponentFixture<AppDetailModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDetailModalComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AppDetailModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
