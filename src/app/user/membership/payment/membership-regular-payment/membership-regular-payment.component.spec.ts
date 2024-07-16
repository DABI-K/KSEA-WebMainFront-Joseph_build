import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipRegularPaymentComponent } from './membership-regular-payment.component';

describe('MembershipRegularPaymentComponent', () => {
  let component: MembershipRegularPaymentComponent;
  let fixture: ComponentFixture<MembershipRegularPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipRegularPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipRegularPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
