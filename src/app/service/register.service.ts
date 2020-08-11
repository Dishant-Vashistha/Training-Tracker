import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  _url = 'http://localhost:8080/newUser'

  constructor(private http:HttpClient) { }

  register(userData:FormData){
    //it will return an observable
    try{
      this.http.post(this._url,userData,{responseType:'text' as 'json'}).toPromise().then(
      data=>{
        if(data==="Done"){
          alert("User Registered SuccessFully!! Now You can SignIn");
        }
        else{
          alert("UserName already Exists!!")
        }
      }
    );
    }catch(err){
      alert("Oops!! Soem error occured")
    }
    //console.log('Chirag Don');
  }
}