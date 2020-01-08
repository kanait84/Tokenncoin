import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsocialComponent } from './coinsocial.component';

describe('CoinsocialComponent', () => {
  let component: CoinsocialComponent;
  let fixture: ComponentFixture<CoinsocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinsocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinsocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
