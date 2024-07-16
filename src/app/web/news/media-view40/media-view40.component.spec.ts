import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView40Component } from './media-view40.component';

describe('MediaView40Component', () => {
  let component: MediaView40Component;
  let fixture: ComponentFixture<MediaView40Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView40Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView40Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
