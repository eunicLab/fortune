import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyStuff } from 'src/app/models/Stuffs';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { StuffService } from 'src/app/services/stuff.service';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {
  @Output() ItemToCart: EventEmitter<any> = new EventEmitter();


  id: string | null = '';
  data: any= { _id: '', title: '', description: '', price: 0, imageUrl: '', email: '' }
  allstuffs: MyStuff[] = [];
  loginData = { token: '', email: '' };
  allCartDataItems: any[] = [];
  allCartData = { _id: '', cartItems: [], email: '' }
  quantity = 1;
  default = { value: 1, name: "1" }
  cartQuantity = 0;
 
 
quantities = [
    { value: 1, name: "1" },
    { value: 2, name: "2" },
    { value: 3, name: "3" },
    { value: 4, name: "4" },
    { value: 5, name: "5" }
  ];
  constructor(
    private activeParms: ActivatedRoute,
    private cartService: CartService,
    private mydata: DataService,
    private router: Router,
    private stuffService: StuffService,
    private spinner: NgxSpinnerService
  ) { }
  

  ngOnInit(): void {
   this.mydata.share.subscribe((x: any)=>this.loginData = x)
    this.id = this.activeParms.snapshot.paramMap.get("id")
    this.mydata.shareStuffData.subscribe((x: any) => this.allstuffs = x)
     this.data = this.allstuffs.find(p => p._id === this.id)
    if (this.allstuffs.length === 0) {
       this.spinner.show()
      this.stuffService.getStuffs().subscribe((info) => {
        this.allstuffs = info;
        this.mydata.updateStuffData(info)
        this.data = this.allstuffs.find(p => p._id === this.id)
        if (info) {
                    setTimeout(() => {
                    this.spinner.hide();
                    }, 1000);
                }
      });
    }
    this.mydata.shareCartData.subscribe((x: any) => this.allCartData = x)
    this.allCartDataItems = this.allCartData.cartItems  
   
  }

  goToLogin() {
    this.router.navigateByUrl('/Login')
  }

  onQuantityChanged(value: any) {
    this.quantity = value;
  }
  
  addToCart = (data: any) => {
      var idRandom = Math.random().toString();
      this.allCartDataItems.push({
        id: idRandom,
        title: data.title,
        price: data.price,
        description: data.description,
        imageUrl: data.imageUrl,
        _id: data._id,
        quantity:this.quantity
      })

 
      var backend =
      {
        _id: this.allCartData._id,
        email: this.loginData.email,
        cartItems: this.allCartDataItems
      }
     
    this.mydata.updateCartData(backend)
    this.mydata.shareCartData.subscribe((x: any) => this.allCartData = x)
  
    if (this.loginData.token !== '') {
      this.cartService.updateCart(backend, this.loginData.token).subscribe();
    }
   for (let i in this.allCartDataItems) {
      this.cartQuantity +=Number(this.allCartDataItems[i].quantity)
    }
    this.mydata.updateCartQuantity(this.cartQuantity )
  }

  continueShopping = () => {
    this.router.navigateByUrl('/');  
  }
  proceedToCheckout = () => {
  this.router.navigateByUrl('/Basket');  
}
  }



