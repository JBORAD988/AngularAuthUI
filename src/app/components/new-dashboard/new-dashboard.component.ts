import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {NgToastService} from "ng-angular-popup";
import {AuthService} from "../../services/auth.service";
import {ApiService} from "../../services/api.service";
import {UserStoreService} from "../../services/user-store.service";
import {Router} from "@angular/router";
import {UserModel} from "../../models/user.model";
import {IEditCell} from "@syncfusion/ej2-angular-grids"
import {
  dataSourceChanged,
  DataSourceChangedEventArgs,
  DataStateChangeEventArgs,
  PageSettingsModel,
  ToolbarItem
} from "@syncfusion/ej2-grids";
import {coerceStringArray} from "@angular/cdk/coercion";

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss']
})
export class NewDashboardComponent implements OnInit{

  constructor(private toast: NgToastService, private auth: AuthService, private api: ApiService, private userStore: UserStoreService, private el: ElementRef, private renderer: Renderer2, private router: Router
  ){}


 ddParams: IEditCell = { params: {value:'Hr'}};

  users: UserModel[] = [];

  ngOnInit() {
    this.setupBurgerMenu();
    this.getUser();

  }

  public fullName: string = "";
  public pageSettings: PageSettingsModel = {pageSize: 15};
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

}
