import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YigComponent } from './yig.component';

describe('YigComponent', () => {
  let component: YigComponent;
  let fixture: ComponentFixture<YigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
