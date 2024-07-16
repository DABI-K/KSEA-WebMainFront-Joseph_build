import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView54Component } from './announcement-view54.component';

describe('AnnouncementView54Component', () => {
  let component: AnnouncementView54Component;
  let fixture: ComponentFixture<AnnouncementView54Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView54Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView54Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
