import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonStatisticsComponent } from './lesson-statistics.component';

describe('LessonStatisticsComponent', () => {
  let component: LessonStatisticsComponent;
  let fixture: ComponentFixture<LessonStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
