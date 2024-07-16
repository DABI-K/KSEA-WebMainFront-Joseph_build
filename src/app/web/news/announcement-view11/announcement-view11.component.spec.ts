import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView11Component } from './announcement-view11.component';

describe('AnnouncementView11Component', () => {
  let component: AnnouncementView11Component;
  let fixture: ComponentFixture<AnnouncementView11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView11Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
