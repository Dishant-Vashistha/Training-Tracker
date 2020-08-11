import { Router } from '@angular/router';
import { LoginServiceService } from './service/login-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private ls:LoginServiceService,private route:Router){

  }
  title = 'Training-Web-App';
  fname:any;
  toggle(){
    
    $('#sidebar').toggleClass('active');
    $('#sidebarCollapse').toggleClass('active');

}
getUserName(){
  if(this.isLogin()){
    return this.fname=this.ls.getUserName().fname;
  }
  else return this.fname=null;
}
isLogin(){
  return this.ls.isUserLoggedIn();
}
logoutUser(){
  this.ls.logout();
  this.route.navigate(['login-user']);
}
}
