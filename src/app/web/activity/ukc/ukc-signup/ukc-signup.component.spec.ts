import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkcSignupComponent } from './ukc-signup.component';

describe('UkcSignupComponent', () => {
  let component: UkcSignupComponent;
  let fixture: ComponentFixture<UkcSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UkcSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkcSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
