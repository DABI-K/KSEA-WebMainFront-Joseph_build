import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView4Component } from './announcement-view4.component';

describe('AnnouncementView4Component', () => {
  let component: AnnouncementView4Component;
  let fixture: ComponentFixture<AnnouncementView4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
