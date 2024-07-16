import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView6Component } from './media-view6.component';

describe('MediaView6Component', () => {
  let component: MediaView6Component;
  let fixture: ComponentFixture<MediaView6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
