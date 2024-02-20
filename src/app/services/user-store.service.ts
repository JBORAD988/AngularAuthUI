import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$ = new  BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  constructor() {
  }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public serRoleForStore(role:string){
    this.role$.next(role);
  }

  public getFullNameFromStore(): Observable<string>{
    return this.fullName$.asObservable();
  }

  public serFullNameForStore(fName : string){
    this.fullName$.next(fName)
  }

}
