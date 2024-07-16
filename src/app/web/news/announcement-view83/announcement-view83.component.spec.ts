import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView83Component } from './announcement-view83.component';

describe('AnnouncementView83Component', () => {
  let component: AnnouncementView83Component;
  let fixture: ComponentFixture<AnnouncementView83Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView83Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView83Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
