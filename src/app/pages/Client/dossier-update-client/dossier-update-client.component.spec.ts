import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierUpdateClientComponent } from './dossier-update-client.component';

describe('DossierUpdateClientComponent', () => {
  let component: DossierUpdateClientComponent;
  let fixture: ComponentFixture<DossierUpdateClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierUpdateClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierUpdateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
