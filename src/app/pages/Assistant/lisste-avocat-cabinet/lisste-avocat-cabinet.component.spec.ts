import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LissteAvocatCabinetComponent } from './lisste-avocat-cabinet.component';

describe('LissteAvocatCabinetComponent', () => {
  let component: LissteAvocatCabinetComponent;
  let fixture: ComponentFixture<LissteAvocatCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LissteAvocatCabinetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LissteAvocatCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
