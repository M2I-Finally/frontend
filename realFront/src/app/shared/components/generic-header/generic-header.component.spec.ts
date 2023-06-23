import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericHeaderComponent } from './generic-header.component';

describe('GenericHeaderComponent', () => {
  let component: GenericHeaderComponent;
  let fixture: ComponentFixture<GenericHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericHeaderComponent]
    });
    fixture = TestBed.createComponent(GenericHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
