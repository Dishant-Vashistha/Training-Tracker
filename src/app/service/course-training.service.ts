import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseTrainingService {

  constructor(private http:HttpClient) { }
  
  createCourse(course:FormData){
    try{
    this.http.post(environment.createCourse,
      course,{responseType:'text' as 'json'}).subscribe(
        response=>alert("Course Created Successfully"),
        err=>alert("Course Updated Successfully")
    );
    }catch(err){
      alert("Opps! Some error have occured!");
    }
  }

  updateCourse(course:FormData){
    try{
      
    this.http.post(environment.editCourse,
      course,{responseType:'text' as 'json'}).subscribe(
      response=>alert("Course Updated Successfully"),
      err=>alert("Course Updated Successfully")
    );
    }catch(err){
      alert("Opps! some error have occured!");
    }

  }
  _createtraining='http://localhost:8080/Training/add';
  createTraining(training:FormData){
    try{
    this.http.post(this._createtraining,
      training,{responseType:'text' as 'json'}).subscribe(
        response=>alert("Training Created Successfully"),
        err=>alert("Opps! Error!")
    );
    }catch(err){
      alert("Opps! Some error have occured!");
    }
  }

  _updateurl1='http://localhost:8080/Training/update';
  updateTraining(training:FormData){
    try{
      
      this.http.put(this._updateurl1,
        training,{responseType:'text' as 'json'}).subscribe(
        response=>alert("Training Updated Successfully"),
        err=>alert("Opps Error!")
      );
      }catch(err){
        alert("Opps! some error have occured!");
      }
  
  }
  updateNominationurl='http://localhost:8080/nomin/add-edit'
  updateNomination(data:FormData)
  {
    return this.http.post(this.updateNominationurl,data,{responseType:'text' as 'json'})
  }

}
