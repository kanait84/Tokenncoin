import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinmarketsComponent } from './coinmarkets.component';

describe('CoinmarketsComponent', () => {
  let component: CoinmarketsComponent;
  let fixture: ComponentFixture<CoinmarketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinmarketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinmarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
