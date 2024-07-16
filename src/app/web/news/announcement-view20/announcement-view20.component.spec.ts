import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView20Component } from './announcement-view20.component';

describe('AnnouncementView20Component', () => {
  let component: AnnouncementView20Component;
  let fixture: ComponentFixture<AnnouncementView20Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView20Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
