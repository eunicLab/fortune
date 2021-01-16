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
  loginData = {token:'', email:''};

    constructor(
    private data: DataService,
   ) { }

  ngOnInit(): void {
    this.data.shareActiveNav.subscribe((x: string) => this.activeNav = x)
    this.data.share.subscribe((x: any) => this.loginData = x)
  }

  updateActiveNav(activeNav:string) {
   this.data.updateActiveNav(activeNav)
 }

}
