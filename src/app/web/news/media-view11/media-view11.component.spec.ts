import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView11Component } from './media-view11.component';

describe('MediaView11Component', () => {
  let component: MediaView11Component;
  let fixture: ComponentFixture<MediaView11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView11Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
