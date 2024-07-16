import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView27Component } from './announcement-view27.component';

describe('AnnouncementView27Component', () => {
  let component: AnnouncementView27Component;
  let fixture: ComponentFixture<AnnouncementView27Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView27Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView27Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
