import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView47Component } from './announcement-view47.component';

describe('AnnouncementView47Component', () => {
  let component: AnnouncementView47Component;
  let fixture: ComponentFixture<AnnouncementView47Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView47Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView47Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
