import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView1Component } from './media-view1.component';

describe('MediaView1Component', () => {
  let component: MediaView1Component;
  let fixture: ComponentFixture<MediaView1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
