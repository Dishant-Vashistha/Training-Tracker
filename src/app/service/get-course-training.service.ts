import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetCourseTrainingService {
  courses=[]
  constructor(private http:HttpClient,private router:Router) {}
   getCourses(){
     return this.http.get<Array<any>>(environment.getCourses);
   }
   getCourse(id){
      return this.http.post(environment.getCourseById,id);
   }

   deleteCourse(id){
    return this.http.post(environment.deleteCourse,id,{responseType:'text' as 'json'});
  }
  
  getTraining(id){
    return this.http.post(environment._getbyid,id);
   }

   deleteTraining(id){
    return this.http.post(environment._deletetrainingurl,id,{responseType:'text' as 'json'});
  }

  getTrainings(){
    return this.http.get<Array<any>>(environment._getrainings);
  }
  
  getNomination(data:FormData){
    return this.http.post(environment.getNominationid,data);
  }


}
