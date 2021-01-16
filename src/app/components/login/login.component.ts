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
            this.data.updateData({ token: this.token, email: this.email, admin:data.admin });
            this.router.navigateByUrl('/')
            this.cartService.getCartItems(this.token, this.email).subscribe(
              info => {
                this.data.updateCartData(info[0])
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
                console.log(data);
                this.loginService.loginUser(newuser).subscribe(async data => {
                  this.token = data.token
                  this.data.updateData({ token: this.token, email: this.email, admin:data.admin });
                  this.router.navigateByUrl('/')
                  let newCartItem = { email: this.email, cartItems: [] }
                  await this.cartService.createCart(newCartItem, data.token).subscribe((info) => {
                    this.cartService.getCartItems(this.token, this.email).subscribe(
                      data => {
                        this.data.updateCartData(data[0])
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


