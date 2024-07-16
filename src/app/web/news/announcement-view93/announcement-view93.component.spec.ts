import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView93Component } from './announcement-view93.component';

describe('AnnouncementView93Component', () => {
  let component: AnnouncementView93Component;
  let fixture: ComponentFixture<AnnouncementView93Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView93Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView93Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
