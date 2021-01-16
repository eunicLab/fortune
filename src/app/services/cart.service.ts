import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewCartItem } from 'src/app/models/Cart';
import { MyCartItem } from 'src/app/models/Cart';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CartService {

 cartUrl = 'https://fortunestorebackend.herokuapp.com/api/cart'
  constructor(private http: HttpClient) { }

    getCartItems(myToken:string, email:string) {
      return this.http.get<[MyCartItem]>(this.cartUrl, {
          params: {
                    email:email,
                  },
          headers: { Authorization: `Bearer ${myToken}`},
        } );
     }
    createCart(item: NewCartItem, myToken: string): Observable<NewCartItem>{
       return this.http.post<NewCartItem>(this.cartUrl, item,{
          headers: { Authorization: `Bearer ${myToken}`},
        });
    }
    updateCart(item: MyCartItem, myToken: string) {
    return this.http.put(`${this.cartUrl}/${item._id}`, item, { headers: { Authorization: `Bearer ${myToken}` } });
  }
}


