import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validateform from "../../helpers/validateform";

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


  constructor(private fb: FormBuilder) {
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
    }else {
      console.log('form invalid')
      Validateform.validateAllFormFileds(this.loginForm);
      alert('your form is not valid')

    }
  }


}
