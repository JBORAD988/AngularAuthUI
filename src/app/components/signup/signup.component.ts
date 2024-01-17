import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Validateform from "../../helpers/validateform";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";


  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth : AuthService, private route : Router) {
  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      Email: ['',Validators.required],
      password: ['',Validators.required],
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"

  }

  onSingup(){
    if (this.signUpForm.valid){
      //perform logic for signup
      console.log(this.signUpForm.value)
      this.auth.signUp(this.signUpForm.value).subscribe(res=>{
        alert(res.message);
        this.signUpForm.reset();
        this.route.navigate(['login'])
      }, error => { alert("User Already Exist")})
    }else{
      //logic for validation check
      console.log(' Form invalid')
      Validateform.validateAllFormFileds(this.signUpForm)
      alert('your form is not valid')

    }

  }


}
