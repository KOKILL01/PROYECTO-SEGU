import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pu } from './pu';

describe('Pu', () => {
  let component: Pu;
  let fixture: ComponentFixture<Pu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Pu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
