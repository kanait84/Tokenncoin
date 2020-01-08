import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCandleStickComponent } from './overview-candle-stick.component';

describe('OverviewCandleStickComponent', () => {
  let component: OverviewCandleStickComponent;
  let fixture: ComponentFixture<OverviewCandleStickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewCandleStickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewCandleStickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
