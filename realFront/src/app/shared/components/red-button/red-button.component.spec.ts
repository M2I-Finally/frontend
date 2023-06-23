import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedButtonComponent } from './red-button.component';

describe('RedButtonComponent', () => {
  let component: RedButtonComponent;
  let fixture: ComponentFixture<RedButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RedButtonComponent]
    });
    fixture = TestBed.createComponent(RedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
