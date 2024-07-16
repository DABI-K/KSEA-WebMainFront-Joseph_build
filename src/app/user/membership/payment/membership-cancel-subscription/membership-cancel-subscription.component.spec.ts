import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipCancelSubscriptionComponent } from './membership-cancel-subscription.component';

describe('MembershipCancelSubscriptionComponent', () => {
  let component: MembershipCancelSubscriptionComponent;
  let fixture: ComponentFixture<MembershipCancelSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipCancelSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipCancelSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
