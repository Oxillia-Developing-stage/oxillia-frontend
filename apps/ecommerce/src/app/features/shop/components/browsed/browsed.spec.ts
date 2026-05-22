import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Browsed } from './browsed';

describe('Browsed', () => {
  let component: Browsed;
  let fixture: ComponentFixture<Browsed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Browsed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Browsed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
