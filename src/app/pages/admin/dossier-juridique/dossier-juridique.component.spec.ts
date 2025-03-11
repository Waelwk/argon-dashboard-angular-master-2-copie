import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierJuridiqueComponent } from './dossier-juridique.component';

describe('DossierJuridiqueComponent', () => {
  let component: DossierJuridiqueComponent;
  let fixture: ComponentFixture<DossierJuridiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierJuridiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierJuridiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
