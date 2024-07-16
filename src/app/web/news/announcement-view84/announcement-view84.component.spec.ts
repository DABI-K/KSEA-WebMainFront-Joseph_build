import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView84Component } from './announcement-view84.component';

describe('AnnouncementView84Component', () => {
  let component: AnnouncementView84Component;
  let fixture: ComponentFixture<AnnouncementView84Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView84Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView84Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
