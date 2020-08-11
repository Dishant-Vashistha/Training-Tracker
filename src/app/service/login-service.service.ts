import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  
  username:string;
  fname:any;

  constructor(private http:HttpClient) { }

  _loginurl='http://localhost:8080/login'
  authenticate(username:string,password:string){
    
    var formData:FormData=new FormData();
    formData.append('username',username);
    formData.append('password',password);
   
    this.username=username;
    
      return this.http.post(this._loginurl,formData,{responseType:'text' as 'json'}).toPromise()    
 }

 isUserLoggedIn(){
  let user=sessionStorage.getItem('authenticatedUser');
  
  return !(user === null);
}

getUserName(){
  return JSON.parse(sessionStorage.getItem('authenticatedUser'));
}

logout(){
  sessionStorage.removeItem('authenticatedUser');
}

}
