import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView3Component } from './media-view3.component';

describe('MediaView3Component', () => {
  let component: MediaView3Component;
  let fixture: ComponentFixture<MediaView3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
