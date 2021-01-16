import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyStuff } from 'src/app/models/Stuffs';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';



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
  allCartData={_id:'', cartItems:[], email:''}


  constructor(
    private activeParms: ActivatedRoute,
    private cartService: CartService,
    private mydata: DataService,
    private router: Router
  ) { }
  

  ngOnInit(): void {
   this.mydata.share.subscribe((x: any)=>this.loginData = x)
    this.id = this.activeParms.snapshot.paramMap.get("id")
    this.mydata.shareStuffData.subscribe((x: any) => this.allstuffs = x)
    this.data = this.allstuffs.find(p=>p._id===this.id)
    this.mydata.shareCartData.subscribe((x: any) => this.allCartData = x)
    this.allCartDataItems = this.allCartData.cartItems
  }

  goToLogin() {
    this.router.navigateByUrl('/Login')
  }
  
  addToCart = (data: any) => {
    if (this.loginData.token !== '') {
      var idRandom = Math.random().toString();
      this.allCartDataItems.push({
        id: idRandom,
        title: data.title,
        price: data.price,
        description: data.description,
        imageUrl: data.imageUrl,
        _id: data._id
      })
    
  
      var backend =
      {
        _id: this.allCartData._id,
        email: this.loginData.email,
        cartItems: this.allCartDataItems
      }
     
      this.mydata.updateCartData(backend)
      this.cartService.updateCart(backend, this.loginData.token).subscribe();
      this.router.navigateByUrl('/');

    }
  
  }
 
  }


