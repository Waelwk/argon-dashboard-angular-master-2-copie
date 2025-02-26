import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetInfoComponent } from './cabinet-info.component';

describe('CabinetInfoComponent', () => {
  let component: CabinetInfoComponent;
  let fixture: ComponentFixture<CabinetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
