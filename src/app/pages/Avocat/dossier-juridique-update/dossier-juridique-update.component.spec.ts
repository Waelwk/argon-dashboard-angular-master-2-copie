import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierJuridiqueUpdateComponent } from './dossier-juridique-update.component';

describe('DossierJuridiqueUpdateComponent', () => {
  let component: DossierJuridiqueUpdateComponent;
  let fixture: ComponentFixture<DossierJuridiqueUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierJuridiqueUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierJuridiqueUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
