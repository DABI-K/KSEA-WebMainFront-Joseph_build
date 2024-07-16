import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationHeaderComponent } from './donation-header.component';

describe('DonationHeaderComponent', () => {
  let component: DonationHeaderComponent;
  let fixture: ComponentFixture<DonationHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
