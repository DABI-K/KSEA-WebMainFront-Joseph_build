import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView44Component } from './announcement-view44.component';

describe('AnnouncementView44Component', () => {
  let component: AnnouncementView44Component;
  let fixture: ComponentFixture<AnnouncementView44Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView44Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView44Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
