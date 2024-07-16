import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView28Component } from './announcement-view28.component';

describe('AnnouncementView28Component', () => {
  let component: AnnouncementView28Component;
  let fixture: ComponentFixture<AnnouncementView28Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView28Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView28Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
