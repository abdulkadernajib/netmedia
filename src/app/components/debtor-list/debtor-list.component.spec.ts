import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorListComponent } from './debtor-list.component';

describe('DebtorListComponent', () => {
  let component: DebtorListComponent;
  let fixture: ComponentFixture<DebtorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
