import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView67Component } from './announcement-view67.component';

describe('AnnouncementView67Component', () => {
  let component: AnnouncementView67Component;
  let fixture: ComponentFixture<AnnouncementView67Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView67Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView67Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
