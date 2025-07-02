import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminP } from './admin-p';

describe('AdminP', () => {
  let component: AdminP;
  let fixture: ComponentFixture<AdminP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
