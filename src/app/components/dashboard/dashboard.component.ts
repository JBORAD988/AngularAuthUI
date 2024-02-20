import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ApiService } from "../../services/api.service";
import { NgToastService } from "ng-angular-popup";
import { UserStoreService } from "../../services/user-store.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {defaultUserModel, UserModel} from "../../models/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users: UserModel[] = [];
  oldUserData: any;

  UserDetails: UserModel ={
    isEdit: true,
    id: '',
    username:'',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  }

  public fullName: string = "";

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private toast: NgToastService,
    private userStore: UserStoreService,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private _httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.getUser();

    this.userStore.getFullNameFromStore().subscribe(
      fullName => {
        let fullNameFromToken = this.auth.getFullNameFromToken();
        this.fullName = fullName || fullNameFromToken;
      },
      error => {
        console.error('Error in getFullNameFromStore:', error);
      }
    );

    this.setupBurgerMenu();
  }

  getUser(){
    this.api.getUsers().subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }

  logout() {
    this.auth.signout();
    this.toast.info({ detail: "Logout", summary: "You have successfully logged out!", duration: 5000 });
  }

  private setupBurgerMenu() {
    const burger = this.el.nativeElement.querySelector('.burger');
    const overlay = this.el.nativeElement.querySelector('.overlay');
    const nav = this.el.nativeElement.querySelector('nav');
    const body = document.body;

    burger.addEventListener('click', () => {
      this.renderer.addClass(burger, 'clicked');
      this.renderer.addClass(overlay, 'show');
      this.renderer.addClass(nav, 'show');
      this.renderer.addClass(body, 'overflow');
    });

    overlay.addEventListener('click', () => {
      this.renderer.removeClass(burger, 'clicked');
      this.renderer.removeClass(overlay, 'show');
      this.renderer.removeClass(nav, 'show');
      this.renderer.removeClass(body, 'overflow');
    });
  }

  // onEdit(userObj: any) {
  //   this.oldUserData = JSON.stringify(userObj);
  //   this.users.forEach((e: any) => e.isEdit = false);
  //   userObj.isEdit = true;
  // }

    onEdit(userObj: UserModel) {
      this.oldUserData = JSON.stringify(userObj);
      this.UserDetails = {
        isEdit: true,
        id: userObj.id,
        username: userObj.username,
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        email: userObj.email,
        role: userObj.role,
      };
      this.users.forEach((e: UserModel) => (e.isEdit = false));
      userObj.isEdit = true;
    }


  Savedata(emp: any) {
    this.users.forEach((e: any) => e.isEdit = false);
    console.log(emp);
  }

  OnCancel(obj: any) {
    const oldData = JSON.parse(this.oldUserData);
    obj.username = oldData.username;
    obj.firstName = oldData.firstName;
    obj.lastName = oldData.lastName;
    obj.email = oldData.email;
    obj.role = oldData.role;
    obj.isEdit = false;
  }

  onDeleteClick(id: string): void {
    this.deleteEmployee(id).subscribe(
      () => this.handleDeleteSuccess(),
      (error) => this.handleDeleteError(error)
    );
  }

  deleteEmployee(id: string): Observable<any> {
    return this._httpClient.delete<any>('https://localhost:7150/api/Users/' + id);
  }

  private handleDeleteSuccess() {
    console.log('User deleted successfully');
    this.toast.success({detail:"Delete Successfully", summary:"User deleted successfully", duration: 5000})
    this.router.navigate(['/dashboard']).then((r) => true);
    this.getUser()
  }

  private handleDeleteError(error: any) {
    console.error('Error deleting employee:', error);
    this.toast.success({detail:"Updated", summary:"User updated successfully:", duration: 5000})
  }



  updateData() {
    debugger
    this.api.updateEmployee(this.UserDetails.id, this.UserDetails).subscribe(
      (response: any) => {
        console.log('User updated successfully:', response);
        this.toast.success({detail:"Updated", summary:"User updated successfully:", duration: 5000})
        this.router.navigate(['/dashboard']).then((r) => true);
        this.getUser()
      },
      (error) => {
        console.error('Error updating employee:', error);
        this.toast.warning({detail:"Data Unchanged", summary:"Error updating employee:", duration: 5000})
      }
    );
  }


  roles = [
    { value: 'USD', viewValue: 'United States Dollar' },
    { value: 'INR', viewValue: 'Indian Rupee' },
    { value: 'AUD', viewValue: 'Australian Dollar' },
    {value: 'EUR ', viewValue: 'Euro'},
    {value: 'GBP ', viewValue: 'British Pound Sterling'},
    {value: 'CAD ', viewValue: 'Canadian Dollar'},
    {value: 'NZD ', viewValue: 'New Zealand Dollar'},
    {value: 'CHF ', viewValue: 'Swiss Franc'},
    {value: 'AED' , viewValue: 'United Arab Emirates Dirham'},
  ];


}
