import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView8Component } from './media-view8.component';

describe('MediaView8Component', () => {
  let component: MediaView8Component;
  let fixture: ComponentFixture<MediaView8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
