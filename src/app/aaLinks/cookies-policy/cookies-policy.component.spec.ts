import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesPolicyComponent } from './cookies-policy.component';

describe('CookiesPolicyComponent', () => {
  let component: CookiesPolicyComponent;
  let fixture: ComponentFixture<CookiesPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookiesPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
