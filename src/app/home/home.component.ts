import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetCourseTrainingService } from './../service/get-course-training.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isApplied:any=false;
 cards:any=[];
  categoryNo: any;
  trainingNo:any;
  nominations:any=[];
  TrainingList:any=[];
  constructor(private router:Router,private gs:GetCourseTrainingService,private http:HttpClient ) { }

  errorMessage:string="Invalid Login Credentials.";
  posts:Array<any>;
  filterTrainingsOfId(){
    if(this.categoryNo!=null)
    return this.TrainingList.filter(x=> x.course.id == this.categoryNo);
    else return this.TrainingList
  }
  ngOnInit(): void {
    this.gs.getCourses().subscribe(res=>{
      this.cards=res;
    },
    err=>{
      alert("Error!")
    });
    this.gs.getTrainings().subscribe(
      res=>this.TrainingList=res,
      err=>alert("Opps! Error")
    );
  }
    toggle(){
    
      $('#sidebar').toggleClass('active');
      $('#sidebarCollapse').toggleClass('active');
  
  }


  onClick(id){
    this.router.navigate(['/view-course',id]);
    
}

onsup(){
  this.router.navigate(['/signup']);
  
}

onrep(){
  this.router.navigate(['/report']);
  
}

}