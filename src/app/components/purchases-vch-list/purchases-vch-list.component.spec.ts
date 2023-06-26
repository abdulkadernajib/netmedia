import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesVchListComponent } from './purchases-vch-list.component';

describe('PurchasesVchListComponent', () => {
  let component: PurchasesVchListComponent;
  let fixture: ComponentFixture<PurchasesVchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesVchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesVchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
