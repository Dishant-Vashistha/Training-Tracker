import { Component, OnInit } from '@angular/core';
import { GetCourseTrainingService } from '../service/get-course-training.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-nominations',
  templateUrl: './view-nominations.component.html',
  styleUrls: ['./view-nominations.component.css']
})
export class ViewNominationsComponent implements OnInit {
  isApplied:any=false;
  CoursesList:any=[];
  TrainingList:any=[];
  categoryNo: any;
  trainingNo:any;
  nominations:any=[]
  constructor(private gs:GetCourseTrainingService,private http:HttpClient,private router:Router) { }
  posts:Array<any>;
  filterTrainingsOfId(){
    if(this.categoryNo!=null)
    return this.TrainingList.filter(x=> x.course.id == this.categoryNo);
    else return this.TrainingList
  }
  ngOnInit(): void {
    this.gs.getCourses().subscribe(
      res=>this.CoursesList=res,
      err=>alert("Opps! Error!")
    )
    this.gs.getTrainings().subscribe(
      res=>this.TrainingList=res,
      err=>alert("opps! error!")
    )
  }
  isChecked:boolean=false;
  selectAll(){
    this.isChecked=!this.isChecked;
  }
  _url='http://localhost:8080/nomin/search';
  onApplied(){
    this.trainingNo=$("#trainingNo").val();
    this.isApplied=true;
    let formdata:FormData=new FormData();
    formdata.append('training',this.trainingNo);
    formdata.append('course',this.categoryNo);
    this.http.post(this._url,formdata).subscribe(
      res=> this.nominations = res,
      err=>alert("opps! Error")
    )
  }
  onEdit(id){
    this.router.navigate(['/editNomination',id]);
  }
  finalList:any=[];
  temp:string="";
  onSubmit(){
    this.finalList=[];
    this.temp=""
    this.finalList=$('.checkboxx');
   //// console.log(this.finalList.length);
    for(let i=0;i<this.finalList.length;i++){
              if(this.finalList[i].checked==true){
                      this.temp+=(this.finalList[i].value)+" ";
                    }
    }
    let formdata:FormData=new FormData();
    formdata.append('nominationDetailIdList',this.temp);
   formdata.append('trainingId',this.trainingNo);
 
  
    let _urlemail:string ='http://localhost:8080/nomin/sendEmailList'
    this.http.post(_urlemail,formdata,{responseType:'text' as 'json'}).subscribe(
      res=>alert("Mail Sent Successfully"),
      err=>alert("Opps! Error")
    )
 }
}



