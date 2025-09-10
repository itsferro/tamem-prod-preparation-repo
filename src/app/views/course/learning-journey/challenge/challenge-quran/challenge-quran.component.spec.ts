import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeQuranComponent } from './challenge-quran.component';

describe('ChallengeQuranComponent', () => {
  let component: ChallengeQuranComponent;
  let fixture: ComponentFixture<ChallengeQuranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeQuranComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeQuranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
