import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C4pComponent } from './c4p.component';

describe('C4pComponent', () => {
  let component: C4pComponent;
  let fixture: ComponentFixture<C4pComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C4pComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(C4pComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
