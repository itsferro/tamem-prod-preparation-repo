import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeMcqOptionsComponent } from './challenge-mcq-options.component';

describe('ChallengeMcqOptionsComponent', () => {
  let component: ChallengeMcqOptionsComponent;
  let fixture: ComponentFixture<ChallengeMcqOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeMcqOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeMcqOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
