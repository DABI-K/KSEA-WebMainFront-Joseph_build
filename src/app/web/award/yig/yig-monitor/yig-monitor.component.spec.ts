import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YigMonitorComponent } from './yig-monitor.component';

describe('YigMonitorComponent', () => {
  let component: YigMonitorComponent;
  let fixture: ComponentFixture<YigMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YigMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YigMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
