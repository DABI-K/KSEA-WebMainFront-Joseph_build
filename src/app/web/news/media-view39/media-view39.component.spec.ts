import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView39Component } from './media-view39.component';

describe('MediaView39Component', () => {
  let component: MediaView39Component;
  let fixture: ComponentFixture<MediaView39Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView39Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView39Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
