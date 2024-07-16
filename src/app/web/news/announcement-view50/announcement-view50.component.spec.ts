import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView50Component } from './announcement-view50.component';

describe('AnnouncementView50Component', () => {
  let component: AnnouncementView50Component;
  let fixture: ComponentFixture<AnnouncementView50Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView50Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView50Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
