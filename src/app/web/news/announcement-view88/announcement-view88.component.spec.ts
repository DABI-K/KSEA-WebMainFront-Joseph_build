import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView88Component } from './announcement-view88.component';

describe('AnnouncementView88Component', () => {
  let component: AnnouncementView88Component;
  let fixture: ComponentFixture<AnnouncementView88Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView88Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView88Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
