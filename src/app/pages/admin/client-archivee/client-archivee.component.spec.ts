import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientArchiveeComponent } from './client-archivee.component';

describe('ClientArchiveeComponent', () => {
  let component: ClientArchiveeComponent;
  let fixture: ComponentFixture<ClientArchiveeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientArchiveeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientArchiveeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
