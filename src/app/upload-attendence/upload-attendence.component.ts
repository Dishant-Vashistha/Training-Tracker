import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetCourseTrainingService } from '../service/get-course-training.service';

@Component({
  selector: 'app-upload-attendence',
  templateUrl: './upload-attendence.component.html',
  styleUrls: ['./upload-attendence.component.css']
})
export class UploadAttendenceComponent implements OnInit {
  data: [][];
  CoursesList:any=[];
  TrainingList:any=[];
  categoryNo: any;
  trainingNo:any;
  url="http://localhost:8080/attendance/uploadAttendance";
  filepath:string;
  x:any;
  fileToUpload: File = null;
  constructor(private http:HttpClient ,private gs:GetCourseTrainingService) { }

  ngOnInit(): void {
     this.gs.getCourses().subscribe(
       res=>this.CoursesList=res,
       err=>alert("Opps! Error!")
     )
     this.gs.getTrainings().subscribe(
       
       res=>{this.TrainingList=res,
        console.log(this.TrainingList)
      },
       err=>alert("opps! error!")
     )
  }
  filterTrainingsOfId(){
    if(this.categoryNo!=null){console.log(this.categoryNo);
    return this.TrainingList.filter(x=> x.course.id == this.categoryNo);}
    else return this.TrainingList
  }

 
  upload() 
  {
    this.trainingNo=$("#trainingNo").val();
    let formdata:FormData=new FormData()
    console.log(this.trainingNo)
       console.log( this.filepath.substring(12));
       formdata.append('file', this.fileToUpload);
        formdata.append('trainingId',this.trainingNo);
       console.log("hello",this.trainingNo);


this.http.post(this.url,formdata,{responseType:'text' as 'json'}).subscribe(res=>alert("Attentdence uploaded successfully"),err=>alert("Attentdence not uploaded"));
       
       
   }
    

  onFileChange(files: FileList) {

    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload.name);
    

    };


}