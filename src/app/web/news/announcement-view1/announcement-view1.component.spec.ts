import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView1Component } from './announcement-view1.component';

describe('AnnouncementView1Component', () => {
  let component: AnnouncementView1Component;
  let fixture: ComponentFixture<AnnouncementView1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
