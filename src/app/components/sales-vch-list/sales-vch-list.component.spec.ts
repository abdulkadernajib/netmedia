import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesVchListComponent } from './sales-vch-list.component';

describe('SalesVchListComponent', () => {
  let component: SalesVchListComponent;
  let fixture: ComponentFixture<SalesVchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesVchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesVchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
