import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView18Component } from './announcement-view18.component';

describe('AnnouncementView18Component', () => {
  let component: AnnouncementView18Component;
  let fixture: ComponentFixture<AnnouncementView18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView18Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
