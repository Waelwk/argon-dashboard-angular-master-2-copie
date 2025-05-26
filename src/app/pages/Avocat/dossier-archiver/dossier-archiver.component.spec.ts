import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierArchiverComponent } from './dossier-archiver.component';

describe('DossierArchiverComponent', () => {
  let component: DossierArchiverComponent;
  let fixture: ComponentFixture<DossierArchiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierArchiverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierArchiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
