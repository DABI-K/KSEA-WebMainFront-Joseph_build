import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView60Component } from './announcement-view60.component';

describe('AnnouncementView60Component', () => {
  let component: AnnouncementView60Component;
  let fixture: ComponentFixture<AnnouncementView60Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView60Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView60Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
