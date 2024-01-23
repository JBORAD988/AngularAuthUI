import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ApiService} from "../../services/api.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  public users:any = [];
  constructor(private auth: AuthService, private api: ApiService , private toast: NgToastService) {
  }

  ngOnInit() {
    this.api.getUsers().subscribe(x=>{
      this.users = x;
    })

  }

  logout(){
    this.auth.signout()
    return this.toast.info({detail:"Logout",summary:"You have successfully logged out!",duration:5000})
  }
}
