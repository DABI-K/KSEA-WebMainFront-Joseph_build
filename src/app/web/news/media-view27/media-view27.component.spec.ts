import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView27Component } from './media-view27.component';

describe('MediaView27Component', () => {
  let component: MediaView27Component;
  let fixture: ComponentFixture<MediaView27Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView27Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView27Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
