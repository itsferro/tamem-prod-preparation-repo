import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInsightsFramesComponent } from './all-insights-frames.component';

describe('AllInsightsFramesComponent', () => {
  let component: AllInsightsFramesComponent;
  let fixture: ComponentFixture<AllInsightsFramesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllInsightsFramesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllInsightsFramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
