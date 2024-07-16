import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView3Component } from './announcement-view3.component';

describe('AnnouncementView3Component', () => {
  let component: AnnouncementView3Component;
  let fixture: ComponentFixture<AnnouncementView3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
