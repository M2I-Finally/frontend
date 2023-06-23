import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowButtonComponent } from './yellow-button.component';

describe('YellowButtonComponent', () => {
  let component: YellowButtonComponent;
  let fixture: ComponentFixture<YellowButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YellowButtonComponent]
    });
    fixture = TestBed.createComponent(YellowButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
