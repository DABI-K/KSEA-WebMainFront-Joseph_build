import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YgGComponent } from './yg-g.component';

describe('YgGComponent', () => {
  let component: YgGComponent;
  let fixture: ComponentFixture<YgGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YgGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YgGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
