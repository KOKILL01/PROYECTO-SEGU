import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cambioprod } from './cambioprod';

describe('Cambioprod', () => {
  let component: Cambioprod;
  let fixture: ComponentFixture<Cambioprod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cambioprod]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cambioprod);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
