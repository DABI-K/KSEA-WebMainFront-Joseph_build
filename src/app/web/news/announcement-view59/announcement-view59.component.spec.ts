import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView59Component } from './announcement-view59.component';

describe('AnnouncementView59Component', () => {
  let component: AnnouncementView59Component;
  let fixture: ComponentFixture<AnnouncementView59Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView59Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView59Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
