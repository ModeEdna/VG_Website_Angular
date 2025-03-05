import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesAndProceduresComponent } from './policies-and-procedures.component';

describe('PoliciesAndProceduresComponent', () => {
  let component: PoliciesAndProceduresComponent;
  let fixture: ComponentFixture<PoliciesAndProceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliciesAndProceduresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliciesAndProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
