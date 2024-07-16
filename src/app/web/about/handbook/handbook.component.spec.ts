import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HadbookComponent } from './handbook.component';

describe('HadbookComponent', () => {
  let component: HadbookComponent;
  let fixture: ComponentFixture<HadbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HadbookComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HadbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
