import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSchoolPaymentComponent } from './membership-school-payment.component';

describe('MembershipSchoolPaymentComponent', () => {
  let component: MembershipSchoolPaymentComponent;
  let fixture: ComponentFixture<MembershipSchoolPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipSchoolPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipSchoolPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
