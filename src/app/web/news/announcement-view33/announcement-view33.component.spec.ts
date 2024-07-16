import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView33Component } from './announcement-view33.component';

describe('AnnouncementView33Component', () => {
  let component: AnnouncementView33Component;
  let fixture: ComponentFixture<AnnouncementView33Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView33Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView33Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
