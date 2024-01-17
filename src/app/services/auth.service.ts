import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http : HttpClient) { }


  signUp(userObj: any){
    return this.http.post<any>('https://localhost:7150/api/Users/register', userObj)

}

  login(loginObj: any){
   return this.http.post<any>('https://localhost:7150/api/Users/authenticate',loginObj)
}
}
