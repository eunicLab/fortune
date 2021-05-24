import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { DataService } from 'src/app/services/data.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {    
  active = 'login';
  email= '';
  password = '';
  firstName = '';
  token = '';
  loginData = { token: '', email: '', admin: false};
  loginError = '';
  errorType = '';
  allCartData = { cartItems: [], email: '', _id: '' };
  allCartDataItems: any[] = [];
  cartQuantity = 0;

  
  

  constructor(
    private loginService: LoginService,
    private data: DataService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => { this.data.updateActiveNav('Login') }, 1);
    this.data.share.subscribe((x: any) => this.loginData = x)
    this.token = this.loginData.token
    this.data.shareCartData.subscribe((x: any) => this.allCartData = x)
    this.allCartDataItems = this.allCartData.cartItems
  }

  handleLogin() {
    this.active = 'login'
    this.loginError = ''
    this.errorType = '';
  }
  handleSignup() {
    this.active = 'signup'
    this.loginError = ''
    this.errorType = '';
  }
  
   // Email validation
  validateEmail(emailInput: any){
    const emailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailInput.match(emailformat)) {
      return true;
    } else {
      return false;
    }
  };
  
  onLogOut() {
    this.token = '';
    this.email = '';
    this.password = '';
    this.data.updateData({ token: '', email: '', admin:false });
}
  
  onSubmit() {
    if (this.token === '') {
      let login = (user: User) => {
          this.loginService.loginUser(user).subscribe(async data => {
            this.token = data.token
            this.data.updateData({ token: this.token, email: this.email, admin: data.admin });
                   
            this.cartService.getCartItems(this.token, this.email).subscribe(
              info => {
              let allCartDataItems = [...info[0].cartItems, ...this.allCartDataItems]
              let backendData = {_id:info[0]._id, email:info[0].email, cartItems:allCartDataItems}
                this.data.updateCartData(backendData)
                this.cartService.updateCart(backendData, this.token).subscribe();
      
                for (let i in allCartDataItems) {
                this.cartQuantity +=Number(allCartDataItems[i].quantity)
                  }
                this.data.updateCartQuantity(this.cartQuantity )
                this.router.navigateByUrl('/')
              }
            )
          }); 
      
      }
      switch (this.active) {
        case 'login':
          const user = {
            email: this.email.toLowerCase(),
            password: this.password,
          };
          login(user);
          if (this.token === '') {
              setTimeout(() => { this.loginError='The email or password you entered is incorrect'}, 500);
           
        }
          break;
        case 'signup':
          const newuser = {
            firstName: this.firstName,
            email: this.email.toLowerCase(),
            password: this.password,
          };
          if (this.firstName !== '') {
            if (this.validateEmail(this.email)) {
               if (this.password !=='') {
              this.loginService.signupUser(newuser).subscribe(data => {
                this.loginService.loginUser(newuser).subscribe(async data => {
                  this.token = data.token
                  this.data.updateData({ token: this.token, email: this.email, admin:data.admin });
                  this.router.navigateByUrl('/')
                  let newCartItem = { email: this.email, cartItems: [] }
                  await this.cartService.createCart(newCartItem, data.token).subscribe((info) => {
                    this.cartService.getCartItems(this.token, this.email).subscribe(
                      data => {
                         let allCartDataItems = [...data[0].cartItems, ...this.allCartDataItems]
                        let backendData = {_id:data[0]._id, email:data[0].email, cartItems:allCartDataItems}
                        this.data.updateCartData(backendData)
                        this.cartService.updateCart(backendData, this.token).subscribe();
                      }
                    )
              
                  })
                });
              });
               } else { this.loginError = 'Please create a password'; this.errorType = 'password' }
            } else{this.loginError='Please enter a valid email address'; this.errorType = 'email' }
          } else{this.loginError='Please enter your first name'; this.errorType = 'firstName'}
          break;
        default:
      }
      
    }
    else { this.onLogOut() }
     
  }
 
  
 
}


