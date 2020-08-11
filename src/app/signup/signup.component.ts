import { GetCourseTrainingService } from './../service/get-course-training.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './../service/register.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  cards=[];
  constructor(private router:Router,private gs:GetCourseTrainingService,private rs:RegisterService) { }

  errorMessage:string="Invalid Login Credentials.";

  signupForm:FormGroup;
  ngOnInit(): void {
    this.signupForm=new FormGroup({
       'username' : new FormControl(null,[Validators.required,Validators.pattern("^[a-zA-Z0-9_]*$"),Validators.minLength(5)]),
       'firstName': new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z ]*")]),
       'lastName': new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z ]*")]),
       'phone': new FormControl(null,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
       'email' :  new FormControl(null,[Validators.required,Validators.email]),
       'password': new FormControl(null,[Validators.required,Validators.minLength(6)])
    });

  }

  public inValidLogin:boolean =false;
   check:any={
      isLogin:false
  }
  
  onSubmit(){  
    let formData: FormData = new FormData();
    formData.append("email", this.signupForm.get('email').value);
    formData.append("password", this.signupForm.get('password').value);
    formData.append("firstName", this.signupForm.get('firstName').value);
    formData.append("lastName", this.signupForm.get('lastName').value);
    formData.append("username", this.signupForm.get('username').value);
    formData.append("phone", this.signupForm.get('phone').value);
        
        
    this.rs.register(formData);
    console.log(formData);
    
   
  }
}