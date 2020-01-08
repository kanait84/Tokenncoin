import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinchartsComponent } from './coincharts.component';

describe('CoinchartsComponent', () => {
  let component: CoinchartsComponent;
  let fixture: ComponentFixture<CoinchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
