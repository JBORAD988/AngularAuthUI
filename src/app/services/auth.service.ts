import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserModel} from "../models/user.model";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userPayload:any;
  constructor(private http : HttpClient, private   route : Router ) {
    this.userPayload = this.decodedToken()
  }


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


decodedToken(){
    const jwtHelper = new JwtHelperService()
  const token = this.getToken()!;
  console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token)
}


getFullNameFromToken(){
    if (this.userPayload)
      return this.userPayload.unique_name;

}

getRoleFromToken(){
    if (this.userPayload)
      return this.userPayload.role;
}


}
