import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http : HttpClient, private   route : Router) { }


  signUp(userObj: any){
    return this.http.post<any>('https://localhost:7150/api/Users/register', userObj)

}

  login(loginObj: any){
   return this.http.post<any>('https://localhost:7150/api/Users/authenticate',loginObj)
}


signout(){
    localStorage.clear();
    // localStorage.removeItem('token')
  this.route.navigate(['login'])
}

storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
}

getToken(){
    return localStorage.getItem('token')
}

isloggedIn(): boolean{
    return !!localStorage.getItem('token')
}


}
