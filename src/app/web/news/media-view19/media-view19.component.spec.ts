import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView19Component } from './media-view19.component';

describe('MediaView19Component', () => {
  let component: MediaView19Component;
  let fixture: ComponentFixture<MediaView19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView19Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
