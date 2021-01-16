import { Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewStuff } from 'src/app/models/Stuffs';
import { MyStuff } from 'src/app/models/Stuffs';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class StuffService {
 

 
  

    stuffUrl = 'https://fortunestorebackend.herokuapp.com/api/stuff'
  constructor(private http: HttpClient) { }
   getStuffs() {
      return this.http.get<[MyStuff]>(this.stuffUrl);
  }

  addStuff(item: NewStuff, myToken: string): Observable<NewStuff>{
       console.log(myToken)
       return this.http.post<NewStuff>(this.stuffUrl, item,{
          headers: { Authorization: `Bearer ${myToken}`},
        });
  }
   deleteStuff(deleteId: string|undefined, myToken: string) {
     return this.http.delete(`${this.stuffUrl}/${deleteId}`,  { headers: { Authorization: `Bearer ${myToken}` } });
   }
  updateStuff(item: MyStuff, myToken: string) {
    return this.http.put(`${this.stuffUrl}/${item._id}`, item, { headers: { Authorization: `Bearer ${myToken}` } });
  }
}
