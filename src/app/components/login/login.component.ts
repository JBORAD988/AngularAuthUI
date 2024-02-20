import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Validateform from "../../helpers/validateform";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {UserStoreService} from "../../services/user-store.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{


  type: string = "password"
  isText: boolean = false;
  eyeIcon:string = 'fa-eye-slash'

  loginForm!: FormGroup;


  constructor(private fb: FormBuilder, private auth: AuthService,private route: Router, private toast: NgToastService, private userStore: UserStoreService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"

  }

  onSubmit(){
    if (this.loginForm.valid){
      console.log(this.loginForm.value)
      //send data to database
      this.auth.login(this.loginForm.value).subscribe(res=>{
        this.toast.success({detail:"SUCCESS", summary: res.message, duration: 5000 })
        this.loginForm.reset();
        this.auth.storeToken(res.token);
        const tokenPayload = this.auth.decodedToken();
        this.userStore.serFullNameForStore(tokenPayload.unique_name);
        this.userStore.serRoleForStore(tokenPayload.role)
        this.route.navigate(['dashboard']);

      },err=>{
        this.toast.error({detail:"Error" ,summary:err.message , duration: 5000})
      })

    }else {
      console.log('form invalid')
      Validateform.validateAllFormFileds(this.loginForm);
     this.toast.warning({detail:"Fill The Details",summary:"Please Enter Username and Password",duration: 5000})

    }
  }


}
