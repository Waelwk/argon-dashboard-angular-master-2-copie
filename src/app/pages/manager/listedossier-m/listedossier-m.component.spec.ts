import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedossierMComponent } from './listedossier-m.component';

describe('ListedossierMComponent', () => {
  let component: ListedossierMComponent;
  let fixture: ComponentFixture<ListedossierMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListedossierMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedossierMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
