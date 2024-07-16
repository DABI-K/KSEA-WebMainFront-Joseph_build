import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView20Component } from './media-view20.component';

describe('MediaView20Component', () => {
  let component: MediaView20Component;
  let fixture: ComponentFixture<MediaView20Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView20Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
