import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesfullComponent } from './succesfull.component';

describe('SuccesfullComponent', () => {
  let component: SuccesfullComponent;
  let fixture: ComponentFixture<SuccesfullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccesfullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
