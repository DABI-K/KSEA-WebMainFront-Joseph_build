import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView58Component } from './announcement-view58.component';

describe('AnnouncementView58Component', () => {
  let component: AnnouncementView58Component;
  let fixture: ComponentFixture<AnnouncementView58Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView58Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView58Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
