import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipResumeSubscriptionComponent } from './membership-resume-subscription.component';

describe('MembershipResumeSubscriptionComponent', () => {
  let component: MembershipResumeSubscriptionComponent;
  let fixture: ComponentFixture<MembershipResumeSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipResumeSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipResumeSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
