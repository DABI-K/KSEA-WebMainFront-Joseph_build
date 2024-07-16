import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView6Component } from './announcement-view6.component';

describe('AnnouncementView6Component', () => {
  let component: AnnouncementView6Component;
  let fixture: ComponentFixture<AnnouncementView6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
