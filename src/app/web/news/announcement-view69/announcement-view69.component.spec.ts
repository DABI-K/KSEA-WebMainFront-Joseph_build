import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView69Component } from './announcement-view69.component';

describe('AnnouncementView69Component', () => {
  let component: AnnouncementView69Component;
  let fixture: ComponentFixture<AnnouncementView69Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView69Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView69Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
