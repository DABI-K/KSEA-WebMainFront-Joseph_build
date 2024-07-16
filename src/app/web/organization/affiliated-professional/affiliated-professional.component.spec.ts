import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatedProfessionalComponent } from './affiliated-professional.component';

describe('AffiliatedProfessionalComponent', () => {
  let component: AffiliatedProfessionalComponent;
  let fixture: ComponentFixture<AffiliatedProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliatedProfessionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffiliatedProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
