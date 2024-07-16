import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView18Component } from './media-view18.component';

describe('MediaView18Component', () => {
  let component: MediaView18Component;
  let fixture: ComponentFixture<MediaView18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView18Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
