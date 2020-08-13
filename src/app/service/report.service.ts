import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

  
  getAtc(){
    return this.http.get<Array<any>>(environment.getAtcReport);
  }
 
  
  getTier(){
    return this.http.get<Array<any>>(environment.getTierReport);
  }
}
