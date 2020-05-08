import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCardComponent } from './solicitud-card.component';

describe('SolicitudCardComponent', () => {
  let component: SolicitudCardComponent;
  let fixture: ComponentFixture<SolicitudCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
