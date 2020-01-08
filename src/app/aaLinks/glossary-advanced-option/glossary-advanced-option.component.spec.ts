import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlossaryAdvancedOptionComponent } from './glossary-advanced-option.component';

describe('GlossaryAdvancedOptionComponent', () => {
  let component: GlossaryAdvancedOptionComponent;
  let fixture: ComponentFixture<GlossaryAdvancedOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlossaryAdvancedOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlossaryAdvancedOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
