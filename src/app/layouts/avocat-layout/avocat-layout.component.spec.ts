import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvocatLayoutComponent } from './avocat-layout.component';

describe('AvocatLayoutComponent', () => {
  let component: AvocatLayoutComponent;
  let fixture: ComponentFixture<AvocatLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvocatLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvocatLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
