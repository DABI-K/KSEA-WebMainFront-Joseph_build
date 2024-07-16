import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView2Component } from './media-view2.component';

describe('MediaView2Component', () => {
  let component: MediaView2Component;
  let fixture: ComponentFixture<MediaView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
