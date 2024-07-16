import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMembershipComponent } from './about-membership.component';

describe('AboutMembershipComponent', () => {
  let component: AboutMembershipComponent;
  let fixture: ComponentFixture<AboutMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMembershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
