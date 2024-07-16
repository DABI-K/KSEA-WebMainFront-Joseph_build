import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView30Component } from './announcement-view30.component';

describe('AnnouncementView30Component', () => {
  let component: AnnouncementView30Component;
  let fixture: ComponentFixture<AnnouncementView30Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView30Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView30Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
