import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinCompareComponent } from './coin-compare.component';

describe('CoinCompareComponent', () => {
  let component: CoinCompareComponent;
  let fixture: ComponentFixture<CoinCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
