import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userempleado } from './userempleado';

describe('Userempleado', () => {
  let component: Userempleado;
  let fixture: ComponentFixture<Userempleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Userempleado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userempleado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
