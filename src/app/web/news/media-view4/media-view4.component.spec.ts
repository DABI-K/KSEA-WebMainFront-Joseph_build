import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView4Component } from './media-view4.component';

describe('MediaView4Component', () => {
  let component: MediaView4Component;
  let fixture: ComponentFixture<MediaView4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
