import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  inValidLogin:boolean=false;
  constructor(private router:Router,private ls:LoginServiceService) { }
  errorMessage:string="Invalid Login"
  signinForm:FormGroup;
  ngOnInit(): void {
    this.signinForm=new FormGroup({
      'username' :  new FormControl(null,[Validators.required]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)])
   });
  }
  toggle(){
    
    $('#sidebar').toggleClass('active');
    $('#sidebarCollapse').toggleClass('active');
  }
  
  handleLogin(){
    this.ls.authenticate(this.signinForm.get('username').value,this.signinForm.get('password').value).then(
      data=>{
        if(data==='False'){
          this.inValidLogin=true
         }
        else{
          
          let userDetails={
            username:this.signinForm.get('username').value,
            fname:<string>data
         }
         sessionStorage.setItem('authenticatedUser',JSON.stringify(userDetails));
         // this.ls.fname=data;
          this.router.navigate(['home']);
          
        }
        
      }
    ).catch(err=>{
      this.inValidLogin=true
    })
  }
}
