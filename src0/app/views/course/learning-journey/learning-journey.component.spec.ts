import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningJourneyComponent } from './learning-journey.component';

describe('LearningJourneyComponent', () => {
  let component: LearningJourneyComponent;
  let fixture: ComponentFixture<LearningJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningJourneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
