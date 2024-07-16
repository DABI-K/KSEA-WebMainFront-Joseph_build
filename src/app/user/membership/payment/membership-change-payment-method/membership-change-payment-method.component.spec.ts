import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipChangePaymentMethodComponent } from './membership-change-payment-method.component';

describe('MembershipChangePaymentMethodComponent', () => {
  let component: MembershipChangePaymentMethodComponent;
  let fixture: ComponentFixture<MembershipChangePaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipChangePaymentMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipChangePaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
