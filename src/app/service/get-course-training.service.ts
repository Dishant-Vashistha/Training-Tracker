import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetCourseTrainingService {
  courses=[]
  constructor(private http:HttpClient,private router:Router) {
    // this.courses.push({
    //   id : 1,
    //   title: 'Angular Training',
    //   image:' ../assets/cloan.png',
    // });
    // this.courses.push({
    //   id : 2,
    //   title: 'React Training',
    //   image:"../assets/hloan.jpg",
    // });
    // this.courses.push({
    //   id : 3,
    //   title: 'Corporate Ethics',
    //   image:' ../assets/eloan.png',
    // });
    // this.courses.push({
    //   id : 4,
    //   title: 'Spring Boot Training',
    //   image:' ../assets/cloan.png',
    // });
    // this.courses.push({
    //   id:5,
    //   title: 'Python Training',
    //   image:"../assets/hloan.jpg",
    // });
    // this.courses.push({
    //   id : 6,
    //   title: 'Big Data Training',
    //   image:' ../assets/eloan.png',
    // });
    // this.courses.push({
    //   id : 7,
    //   title: 'NodeJs Training',
    //   image:' ../assets/cloan.png',
    // });
    // this.courses.push({
    //   id : 9,
    //   title: 'PHP Training',
    //   image:"../assets/hloan.jpg",
    // });
    // this.courses.push({
    //   id : 10,
    //   title: 'Presentation Skills',
    //   image:' ../assets/eloan.png',
    // });
   }
   getCourses(){
     return this.http.get<Array<any>>(environment.getCourses);
   }
   getCourse(id){
      return this.http.post(environment.getCourseById,id);
   }

   deleteCourse(id){
    return this.http.post(environment.deleteCourse,id,{responseType:'text' as 'json'});
  }
  _getbyid='http://localhost:8080/Training/findById'
  getTraining(id){
    return this.http.post(this._getbyid,id);
   }

   _deletetrainingurl='http://localhost:8080/Training/delete'
   deleteTraining(id){
    return this.http.post(this._deletetrainingurl,id,{responseType:'text' as 'json'});
  }

  _getrainings='http://localhost:8080/Training/showAll'
  getTrainings(){
    return this.http.get<Array<any>>(this._getrainings);
  }
  
  getNominationid='http://localhost:8080/nomin/findById'
  getNomination(data:FormData){
    return this.http.post(this.getNominationid,data);
  }

  getAtcReport='http://localhost:8080/nomin/getATCreport'
  getAtc(){
    return this.http.get<Array<any>>(this.getAtcReport);
  }
 

}
