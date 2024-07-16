import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView82Component } from './announcement-view82.component';

describe('AnnouncementView82Component', () => {
  let component: AnnouncementView82Component;
  let fixture: ComponentFixture<AnnouncementView82Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView82Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView82Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
