import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView73Component } from './announcement-view73.component';

describe('AnnouncementView73Component', () => {
  let component: AnnouncementView73Component;
  let fixture: ComponentFixture<AnnouncementView73Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView73Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView73Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
