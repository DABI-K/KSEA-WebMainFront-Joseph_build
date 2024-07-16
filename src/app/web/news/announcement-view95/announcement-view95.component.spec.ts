import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView95Component } from './announcement-view95.component';

describe('AnnouncementView95Component', () => {
  let component: AnnouncementView95Component;
  let fixture: ComponentFixture<AnnouncementView95Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView95Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView95Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
