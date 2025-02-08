import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbardachComponent } from './navbardach.component';

describe('NavbardachComponent', () => {
  let component: NavbardachComponent;
  let fixture: ComponentFixture<NavbardachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbardachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbardachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
