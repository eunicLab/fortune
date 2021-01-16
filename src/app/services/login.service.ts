import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { NewUser} from 'src/app/models/User';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = 'https://fortunestorebackend.herokuapp.com/api/auth/login'
  signupUrl = 'https://fortunestorebackend.herokuapp.com/api/auth/signup'

  constructor(private http: HttpClient) { }
    loginUser(user: User): Observable<any>{
     return this.http.post<User>(this.loginUrl, user);
    }
  
     signupUser(user: NewUser): Observable<NewUser>{
     return this.http.post<NewUser>(this.signupUrl, user);
  }
}
