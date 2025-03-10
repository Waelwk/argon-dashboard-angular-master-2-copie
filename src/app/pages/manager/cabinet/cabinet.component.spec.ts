import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetMComponent } from './cabinet.component';

describe('CabinetComponent', () => {
  let component: CabinetMComponent;
  let fixture: ComponentFixture<CabinetMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinetMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
