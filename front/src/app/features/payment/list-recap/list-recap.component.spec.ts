import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecapComponent } from './list-recap.component';

describe('ListRecapComponent', () => {
  let component: ListRecapComponent;
  let fixture: ComponentFixture<ListRecapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRecapComponent]
    });
    fixture = TestBed.createComponent(ListRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
