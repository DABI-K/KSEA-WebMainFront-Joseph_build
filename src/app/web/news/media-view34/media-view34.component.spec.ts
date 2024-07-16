import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView34Component } from './media-view34.component';

describe('MediaView34Component', () => {
  let component: MediaView34Component;
  let fixture: ComponentFixture<MediaView34Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView34Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView34Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
