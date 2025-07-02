import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nproducto } from './nproducto';

describe('Nproducto', () => {
  let component: Nproducto;
  let fixture: ComponentFixture<Nproducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Nproducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nproducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
