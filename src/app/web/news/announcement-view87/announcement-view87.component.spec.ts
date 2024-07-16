import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView87Component } from './announcement-view87.component';

describe('AnnouncementView87Component', () => {
  let component: AnnouncementView87Component;
  let fixture: ComponentFixture<AnnouncementView87Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView87Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView87Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
