import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView85Component } from './announcement-view85.component';

describe('AnnouncementView85Component', () => {
  let component: AnnouncementView85Component;
  let fixture: ComponentFixture<AnnouncementView85Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView85Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView85Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
