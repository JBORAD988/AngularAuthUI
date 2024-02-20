import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any>('https://localhost:7150/api/Users')
  }

  updateEmployee(id: string, UpdateData: UserModel): Observable<UserModel>{
    return this.http.post<UserModel>('https://localhost:7150/api/Users/' + id, UpdateData)
  }


}
