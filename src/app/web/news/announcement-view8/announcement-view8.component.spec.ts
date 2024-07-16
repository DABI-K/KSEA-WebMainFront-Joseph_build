import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView8Component } from './announcement-view8.component';

describe('AnnouncementView8Component', () => {
  let component: AnnouncementView8Component;
  let fixture: ComponentFixture<AnnouncementView8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
