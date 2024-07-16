import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView81Component } from './announcement-view81.component';

describe('AnnouncementView81Component', () => {
  let component: AnnouncementView81Component;
  let fixture: ComponentFixture<AnnouncementView81Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView81Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView81Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
