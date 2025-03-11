import { TestBed } from '@angular/core/testing';
import { DossierJuridiqueUpdateService } from './dossier-juridique-update.service';



describe('DossierJuridiqueUpdateService', () => {
  let service: DossierJuridiqueUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DossierJuridiqueUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
