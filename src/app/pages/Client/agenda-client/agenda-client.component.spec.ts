import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaClientComponent } from './agenda-client.component';

describe('AgendaClientComponent', () => {
  let component: AgendaClientComponent;
  let fixture: ComponentFixture<AgendaClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
