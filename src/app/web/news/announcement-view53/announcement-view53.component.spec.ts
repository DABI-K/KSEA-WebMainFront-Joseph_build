import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView53Component } from './announcement-view53.component';

describe('AnnouncementView53Component', () => {
  let component: AnnouncementView53Component;
  let fixture: ComponentFixture<AnnouncementView53Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView53Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView53Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
