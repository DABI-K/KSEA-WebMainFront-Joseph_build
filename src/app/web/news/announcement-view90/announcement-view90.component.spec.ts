import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView90Component } from './announcement-view90.component';

describe('AnnouncementView90Component', () => {
  let component: AnnouncementView90Component;
  let fixture: ComponentFixture<AnnouncementView90Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView90Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView90Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
