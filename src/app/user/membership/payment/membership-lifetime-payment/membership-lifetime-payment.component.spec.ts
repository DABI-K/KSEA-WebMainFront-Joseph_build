import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipLifetimePaymentComponent } from './membership-lifetime-payment.component';

describe('MembershipLifetimePaymentComponent', () => {
  let component: MembershipLifetimePaymentComponent;
  let fixture: ComponentFixture<MembershipLifetimePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipLifetimePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipLifetimePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
