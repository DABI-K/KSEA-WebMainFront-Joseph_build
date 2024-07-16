import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkcComponent } from './ukc.component';

describe('UkcComponent', () => {
  let component: UkcComponent;
  let fixture: ComponentFixture<UkcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UkcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
