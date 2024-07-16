import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HacComponent } from './hac.component';

describe('HacComponent', () => {
  let component: HacComponent;
  let fixture: ComponentFixture<HacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
