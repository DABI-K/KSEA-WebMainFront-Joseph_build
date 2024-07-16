import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView71Component } from './announcement-view71.component';

describe('AnnouncementView71Component', () => {
  let component: AnnouncementView71Component;
  let fixture: ComponentFixture<AnnouncementView71Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView71Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView71Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
