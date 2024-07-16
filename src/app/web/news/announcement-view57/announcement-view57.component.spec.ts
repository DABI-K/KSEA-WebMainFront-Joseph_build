import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView57Component } from './announcement-view57.component';

describe('AnnouncementView57Component', () => {
  let component: AnnouncementView57Component;
  let fixture: ComponentFixture<AnnouncementView57Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView57Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView57Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
