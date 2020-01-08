import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsNConditionComponent } from './terms-ncondition.component';

describe('TermsNConditionComponent', () => {
  let component: TermsNConditionComponent;
  let fixture: ComponentFixture<TermsNConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsNConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsNConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
