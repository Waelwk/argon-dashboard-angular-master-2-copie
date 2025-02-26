import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerArchiveeComponent } from './manager-archivee.component';

describe('ManagerArchiveeComponent', () => {
  let component: ManagerArchiveeComponent;
  let fixture: ComponentFixture<ManagerArchiveeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerArchiveeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerArchiveeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
