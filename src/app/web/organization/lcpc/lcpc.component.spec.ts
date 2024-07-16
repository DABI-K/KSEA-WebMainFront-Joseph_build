import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcpcComponent } from './lcpc.component';

describe('LcpcComponent', () => {
  let component: LcpcComponent;
  let fixture: ComponentFixture<LcpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LcpcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LcpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
