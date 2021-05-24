import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private content = new BehaviorSubject<any>({token:'', email:'', admin:false})
  public share = this.content.asObservable();

  private cartData = new BehaviorSubject<any>({_id:'', cartItems:[], email:''})
  public shareCartData = this.cartData.asObservable();

  private activeNav = new BehaviorSubject<string>('')
  public shareActiveNav = this.activeNav.asObservable();

  private stuffData = new BehaviorSubject<any>([])
  public shareStuffData = this.stuffData.asObservable();

  private cartQuantity = new BehaviorSubject<Number>(0)
  public shareCartQuantity = this.cartQuantity.asObservable();

  constructor() { }
  updateData(text: any) {
    this.content.next(text);
  }
  updateCartData(text: any) {
    this.cartData.next(text);
   }
  updateStuffData(text: any) {
    this.stuffData.next(text)
  }

  updateActiveNav(text: string) {
    this.activeNav.next(text)
  }
  updateCartQuantity(text: Number) {
    this.cartQuantity.next(text)
  }
}



