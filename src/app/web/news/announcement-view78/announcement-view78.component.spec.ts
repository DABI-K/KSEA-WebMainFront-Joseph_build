import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView78Component } from './announcement-view78.component';

describe('AnnouncementView78Component', () => {
  let component: AnnouncementView78Component;
  let fixture: ComponentFixture<AnnouncementView78Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView78Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView78Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
