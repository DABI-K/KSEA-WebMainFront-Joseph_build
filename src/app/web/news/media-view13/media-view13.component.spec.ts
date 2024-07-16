import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView13Component } from './media-view13.component';

describe('MediaView13Component', () => {
  let component: MediaView13Component;
  let fixture: ComponentFixture<MediaView13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView13Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
