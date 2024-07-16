import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView17Component } from './media-view17.component';

describe('MediaView17Component', () => {
  let component: MediaView17Component;
  let fixture: ComponentFixture<MediaView17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView17Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
