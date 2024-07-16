import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView32Component } from './announcement-view32.component';

describe('AnnouncementView32Component', () => {
  let component: AnnouncementView32Component;
  let fixture: ComponentFixture<AnnouncementView32Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView32Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
