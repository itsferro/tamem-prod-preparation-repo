import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonBlockTestComponent } from './lesson-block-test.component';

describe('LessonBlockTestComponent', () => {
  let component: LessonBlockTestComponent;
  let fixture: ComponentFixture<LessonBlockTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonBlockTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonBlockTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
