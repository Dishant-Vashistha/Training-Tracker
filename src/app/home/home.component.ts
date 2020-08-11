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
  TrainingList:any=[{title:"Java1",id:1,duration:11,sd:'2020-07-07',ed:'2020-10-07',st:"2PM",et:"3PM",trainer:"Bobby",status:"Active"}
  ,{title:"Java2",duration:11,id:1,sd:'2020-07-07',ed:'2020-10-07',st:"3PM",et:"4PM",trainer:"Pankaj Vashistha",status:"Not Active"},
  {title:"Java3",duration:13,id:1,sd:'2020-04-07',ed:'2020-06-07',st:"4PM",et:"5PM",trainer:"Jazzy",status:"Active"},
  {title:"Angular1",duration:12,id:2,sd:'2020-03-07',ed:'2020-04-07',st:"1PM",et:"3PM",trainer:"Rama",status:"Active"},
  {title:"Angular2",duration:11,id:2,sd:'2020-09-07',ed:'2020-11-07',st:"2PM",et:"4PM",trainer:"Radhey",status:"Not Active"},
];
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
    )
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