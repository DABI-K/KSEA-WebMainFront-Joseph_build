import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkcSigninComponent } from './ukc-signin.component';

describe('UkcSigninComponent', () => {
  let component: UkcSigninComponent;
  let fixture: ComponentFixture<UkcSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UkcSigninComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkcSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
