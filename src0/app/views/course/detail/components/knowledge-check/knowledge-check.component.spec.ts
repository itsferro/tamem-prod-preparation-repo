import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeCheckComponent } from './knowledge-check.component';

describe('KnowledgeCheckComponent', () => {
  let component: KnowledgeCheckComponent;
  let fixture: ComponentFixture<KnowledgeCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowledgeCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnowledgeCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
