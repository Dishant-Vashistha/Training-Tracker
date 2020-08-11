import { Component, OnInit } from '@angular/core';
import { GetCourseTrainingService } from '../service/get-course-training.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx'; 
@Component({
  selector: 'app-view-attendence',
  templateUrl: './view-attendence.component.html',
  styleUrls: ['./view-attendence.component.css']
})
export class ViewAttendenceComponent implements OnInit {

  isApplied:any=false;
  CoursesList:any=[];
  TrainingList:any=[];
  categoryNo: any;
  trainingNo:any;
  nominations:any=[]
  constructor(private gs:GetCourseTrainingService,private http:HttpClient) { }
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
  _url='http://localhost:8080/attendance/showAttendance';
  onApplied(){
    this.isApplied=true;
    this.trainingNo=$("#trainingNo").val();
    let formdata:FormData=new FormData();
    formdata.append('trainingId',this.trainingNo);
    //formdata.append('course',this.categoryNo);
    this.http.post(this._url,formdata).subscribe(
      res=> this.nominations = res,
      err=>alert("opps! Error")
    )
  }

  fileName='AttendenceReport.xlsx';
 exportexcel(): void 
      {
         /* table id is passed over here */   
         let element = document.getElementById('excel-table'); 
         const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  
         /* generate workbook and add the worksheet */
         const wb: XLSX.WorkBook = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
         /* save to file */
         XLSX.writeFile(wb, this.fileName);
        
      }
}