import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsIdentificationComponent } from './parts-identification.component';

describe('PartsIdentificationComponent', () => {
  let component: PartsIdentificationComponent;
  let fixture: ComponentFixture<PartsIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartsIdentificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartsIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
