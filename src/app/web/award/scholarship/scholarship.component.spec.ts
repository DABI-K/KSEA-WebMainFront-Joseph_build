import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshihpComponent } from './scholarship.component';

describe('ScholarshihpComponent', () => {
  let component: ScholarshihpComponent;
  let fixture: ComponentFixture<ScholarshihpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScholarshihpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScholarshihpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
