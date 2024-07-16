import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView56Component } from './announcement-view56.component';

describe('AnnouncementView56Component', () => {
  let component: AnnouncementView56Component;
  let fixture: ComponentFixture<AnnouncementView56Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView56Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView56Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
