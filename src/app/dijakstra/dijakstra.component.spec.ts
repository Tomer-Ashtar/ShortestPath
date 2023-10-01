import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DijakstraComponent } from './dijakstra.component';

describe('DijakstraComponent', () => {
  let component: DijakstraComponent;
  let fixture: ComponentFixture<DijakstraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DijakstraComponent]
    });
    fixture = TestBed.createComponent(DijakstraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
