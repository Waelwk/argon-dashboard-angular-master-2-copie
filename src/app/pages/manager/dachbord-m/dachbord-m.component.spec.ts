import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DachbordMComponent } from './dachbord-m.component';

describe('DachbordMComponent', () => {
  let component: DachbordMComponent;
  let fixture: ComponentFixture<DachbordMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DachbordMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DachbordMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
