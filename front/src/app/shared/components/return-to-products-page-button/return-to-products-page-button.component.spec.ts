import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnToProductsPageButtonComponent } from './return-to-products-page-button.component';

describe('ReturnToProductsPageButtonComponent', () => {
  let component: ReturnToProductsPageButtonComponent;
  let fixture: ComponentFixture<ReturnToProductsPageButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnToProductsPageButtonComponent]
    });
    fixture = TestBed.createComponent(ReturnToProductsPageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
