import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView94Component } from './announcement-view94.component';

describe('AnnouncementView94Component', () => {
  let component: AnnouncementView94Component;
  let fixture: ComponentFixture<AnnouncementView94Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView94Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView94Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
