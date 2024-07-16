import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView14Component } from './media-view14.component';

describe('MediaView14Component', () => {
  let component: MediaView14Component;
  let fixture: ComponentFixture<MediaView14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView14Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
