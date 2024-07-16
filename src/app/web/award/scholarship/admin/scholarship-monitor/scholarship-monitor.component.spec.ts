import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipMonitorComponent } from './scholarship-monitor.component';

describe('ScholarshipMonitorComponent', () => {
  let component: ScholarshipMonitorComponent;
  let fixture: ComponentFixture<ScholarshipMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarshipMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarshipMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
