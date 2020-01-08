import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcosComponent } from './icos.component';

describe('IcosComponent', () => {
  let component: IcosComponent;
  let fixture: ComponentFixture<IcosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
