import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallangesBoxComponent } from './challanges-box.component';

describe('ChallangesBoxComponent', () => {
  let component: ChallangesBoxComponent;
  let fixture: ComponentFixture<ChallangesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallangesBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallangesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
