import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView14Component } from './announcement-view14.component';

describe('AnnouncementView14Component', () => {
  let component: AnnouncementView14Component;
  let fixture: ComponentFixture<AnnouncementView14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView14Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
