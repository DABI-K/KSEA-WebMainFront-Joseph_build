import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView34Component } from './announcement-view34.component';

describe('AnnouncementView34Component', () => {
  let component: AnnouncementView34Component;
  let fixture: ComponentFixture<AnnouncementView34Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView34Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView34Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
