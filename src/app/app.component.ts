import { Component } from '@angular/core';
import { DataService } from './services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fortune';
  activeNav = '';
  loginData = { token: '', email: '' };
  cartQuantity = 0;

    constructor(
    private data: DataService,
   ) { }

  ngOnInit(): void {
    this.data.shareActiveNav.subscribe((x: string) => this.activeNav = x)
    this.data.share.subscribe((x: any) => this.loginData = x)
    this.data.shareCartQuantity.subscribe((x:any)=>this.cartQuantity=x)
  }

  updateActiveNav(activeNav:string) {
   this.data.updateActiveNav(activeNav)
 }

}

