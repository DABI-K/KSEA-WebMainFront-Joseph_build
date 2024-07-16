import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView2Component } from './announcement-view2.component';

describe('AnnouncementView2Component', () => {
  let component: AnnouncementView2Component;
  let fixture: ComponentFixture<AnnouncementView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
