import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinHistoriComponent } from './coin-histori.component';

describe('CoinHistoriComponent', () => {
  let component: CoinHistoriComponent;
  let fixture: ComponentFixture<CoinHistoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinHistoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinHistoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
