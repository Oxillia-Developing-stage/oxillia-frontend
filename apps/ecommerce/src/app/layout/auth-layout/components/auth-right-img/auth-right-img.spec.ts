import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRightImg } from './auth-right-img';

describe('AuthRightImg', () => {
  let component: AuthRightImg;
  let fixture: ComponentFixture<AuthRightImg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthRightImg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthRightImg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
