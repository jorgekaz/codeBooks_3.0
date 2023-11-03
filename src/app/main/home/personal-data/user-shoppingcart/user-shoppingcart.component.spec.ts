import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShoppingcartComponent } from './user-shoppingcart.component';

describe('UserShoppingcartComponent', () => {
  let component: UserShoppingcartComponent;
  let fixture: ComponentFixture<UserShoppingcartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserShoppingcartComponent]
    });
    fixture = TestBed.createComponent(UserShoppingcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
