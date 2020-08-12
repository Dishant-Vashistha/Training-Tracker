import { AttendenceNominationService } from './../service/attendence-nomination.service';
import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { GetCourseTrainingService } from '../service/get-course-training.service';
@Component({
  selector: 'app-upload-nominations',
  templateUrl: './upload-nominations.component.html',
  styleUrls: ['./upload-nominations.component.css']
})
export class UploadNominationsComponent implements OnInit {
  data: [][];
  CoursesList:any=[];
  TrainingList:any=[];
  categoryNo: any;
  trainingNo:any;
  
  filepath:string;
  showErrorLog:boolean=false;
  fileToUpload: File = null;
  constructor(private http:HttpClient ,private gs:GetCourseTrainingService,private an:AttendenceNominationService) { }

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
  filterTrainingsOfId(){
    if(this.categoryNo!=null){console.log(this.categoryNo);
    return this.TrainingList.filter(x=> x.course.id == this.categoryNo);}
    else return this.TrainingList
  }

  errorLog:Array<any>;
  upload() 
  { this.showErrorLog=true;
    this.trainingNo=$("#trainingNo").val();
    console.log(this.trainingNo)
    let formdata:FormData=new FormData()
       console.log( this.filepath.substring(12));
       formdata.append('file', this.fileToUpload);
        formdata.append('trainingId',this.trainingNo);
       console.log(formdata);

this.an.uploadNomination(formdata).subscribe(
  res=>{alert("Nominations Uploaded Successfully!")
  this.errorLog=res}
  ,err=>console.log("Not Uploaded Successfully"));
       
       
   }
  showMessage:boolean=false;
  checkErrorLog(){
    this.showMessage=!this.showMessage;
  }
  onFileChange(files: FileList) {

    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload.name);
    

    };

 
  }