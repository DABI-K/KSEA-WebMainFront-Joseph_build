import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView30Component } from './media-view30.component';

describe('MediaView30Component', () => {
  let component: MediaView30Component;
  let fixture: ComponentFixture<MediaView30Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView30Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView30Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
