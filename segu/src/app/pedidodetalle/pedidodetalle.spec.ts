import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pedidodetalle } from './pedidodetalle';

describe('Pedidodetalle', () => {
  let component: Pedidodetalle;
  let fixture: ComponentFixture<Pedidodetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Pedidodetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pedidodetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
