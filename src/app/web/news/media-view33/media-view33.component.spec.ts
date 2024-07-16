import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView33Component } from './media-view33.component';

describe('MediaView33Component', () => {
  let component: MediaView33Component;
  let fixture: ComponentFixture<MediaView33Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView33Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView33Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
