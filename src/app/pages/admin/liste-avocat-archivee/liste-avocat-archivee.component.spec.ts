import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAvocatArchiveeComponent } from './liste-avocat-archivee.component';

describe('ListeAvocatArchiveeComponent', () => {
  let component: ListeAvocatArchiveeComponent;
  let fixture: ComponentFixture<ListeAvocatArchiveeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAvocatArchiveeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAvocatArchiveeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
