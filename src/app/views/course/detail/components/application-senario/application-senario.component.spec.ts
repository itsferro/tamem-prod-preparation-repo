import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSenarioComponent } from './application-senario.component';

describe('ApplicationSenarioComponent', () => {
  let component: ApplicationSenarioComponent;
  let fixture: ComponentFixture<ApplicationSenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationSenarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationSenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
