import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {  
  loginData = { token: '', email: '' };
  allCartData = { cartItems: [], email: '', _id: '' };
  allCartDataItems: any[] = [];
  total = 0;


  constructor(
    private data: DataService,
    private cartService: CartService) { }

  ngOnInit(): void {
  setTimeout( ()=>{this.data.updateActiveNav('Basket') }, 1);  
  this.data.share.subscribe((x:any)=>this.loginData=x)
  this.data.shareCartData.subscribe((x: any) => this.allCartData = x)
  this.allCartDataItems = this.allCartData.cartItems
    for (let i in this.allCartDataItems) {
      this.total += Number(this.allCartDataItems[i].price)
    }
  }





  deleteCartData(id:any) {
   var backend = this.allCartDataItems.filter(
      (number) => number.id !== id
    );
    this.data.updateCartData({
      cartItems: backend,
      email: this.allCartData.email,
      _id: this.allCartData._id
    })
    this.allCartDataItems = backend
    this.total = 0;
    for (let i in this.allCartDataItems) {
      this.total += Number(this.allCartDataItems[i].price)
    }
    if (this.loginData.token !== '') {
      this.cartService.updateCart({
        cartItems: backend,
        email: this.allCartData.email,
        _id: this.allCartData._id
      }, this.loginData.token).subscribe();
    }
  }
}
