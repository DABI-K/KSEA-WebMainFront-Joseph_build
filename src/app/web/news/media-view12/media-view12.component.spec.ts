import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView12Component } from './media-view12.component';

describe('MediaView12Component', () => {
  let component: MediaView12Component;
  let fixture: ComponentFixture<MediaView12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView12Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
