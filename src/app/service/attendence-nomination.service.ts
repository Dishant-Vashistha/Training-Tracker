import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendenceNominationService {

  constructor(private http:HttpClient) { }

  uploadNomination(formData:FormData){
    return this.http.post<Array<any>>(environment.uploadNom,formData);
  }

  uploadAttendence(formData:FormData){
    return this.http.post(environment.uploadAtt,formData,{responseType:'text' as 'json'});
  }

  viewNomination(formData:FormData){
    return this.http.post<Array<any>>(environment.viewNom,formData);
  }

  viewAttendence(formData:FormData){
    return this.http.post<Array<any>>(environment.viewAtt,formData);
  }

  sendMail(formData:FormData){
    return this.http.post(environment.sendMail,formData,{responseType:'text' as 'json'});
  }
}
