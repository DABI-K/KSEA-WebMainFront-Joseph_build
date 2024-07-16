import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkcMonitorComponent } from './ukc-monitor.component';

describe('UkcMonitorComponent', () => {
  let component: UkcMonitorComponent;
  let fixture: ComponentFixture<UkcMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UkcMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkcMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
