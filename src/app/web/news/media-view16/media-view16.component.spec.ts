import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView16Component } from './media-view16.component';

describe('MediaView16Component', () => {
  let component: MediaView16Component;
  let fixture: ComponentFixture<MediaView16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView16Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
