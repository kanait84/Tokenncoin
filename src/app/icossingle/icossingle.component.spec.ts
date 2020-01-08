import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcossingleComponent } from './icossingle.component';

describe('IcossingleComponent', () => {
  let component: IcossingleComponent;
  let fixture: ComponentFixture<IcossingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcossingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcossingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
