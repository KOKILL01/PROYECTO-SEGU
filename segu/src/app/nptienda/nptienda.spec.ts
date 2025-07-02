import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nptienda } from './nptienda';

describe('Nptienda', () => {
  let component: Nptienda;
  let fixture: ComponentFixture<Nptienda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Nptienda]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nptienda);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
