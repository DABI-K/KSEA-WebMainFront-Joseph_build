import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView35Component } from './announcement-view35.component';

describe('AnnouncementView35Component', () => {
  let component: AnnouncementView35Component;
  let fixture: ComponentFixture<AnnouncementView35Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView35Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView35Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
