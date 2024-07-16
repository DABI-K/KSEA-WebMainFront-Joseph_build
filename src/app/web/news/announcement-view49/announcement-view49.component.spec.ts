import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView49Component } from './announcement-view49.component';

describe('AnnouncementView49Component', () => {
  let component: AnnouncementView49Component;
  let fixture: ComponentFixture<AnnouncementView49Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView49Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView49Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
