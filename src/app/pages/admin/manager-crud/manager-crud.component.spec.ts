import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCrudComponent } from './manager-crud.component';

describe('ManagerCrudComponent', () => {
  let component: ManagerCrudComponent;
  let fixture: ComponentFixture<ManagerCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
