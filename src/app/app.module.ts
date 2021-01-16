import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { StuffsComponent } from './components/stuffs/stuffs.component';
import { SingleItemComponent } from './components/single-item/single-item.component';
import { AdminComponent } from './components/admin/admin.component';
import { BasketComponent } from './components/basket/basket.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StuffsComponent,
    SingleItemComponent,
    BasketComponent,
    AdminComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
