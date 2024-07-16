import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView13Component } from './announcement-view13.component';

describe('AnnouncementView13Component', () => {
  let component: AnnouncementView13Component;
  let fixture: ComponentFixture<AnnouncementView13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView13Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
