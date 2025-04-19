import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilAvocatComponent } from './edit-profil-avocat.component';

describe('EditProfilAvocatComponent', () => {
  let component: EditProfilAvocatComponent;
  let fixture: ComponentFixture<EditProfilAvocatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfilAvocatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfilAvocatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
