import { GetCourseTrainingService } from '../service/get-course-training.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { CellCustomComponent } from '../cell-custom/cell-custom.component';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  columnDefs;
  paginationPageSize=15;
  private sortingOrder;
  
  
  CoursesList:any=[];
  TrainingList:any=[];
  Title:string
  id:any;
  disableUpdate:boolean=false;
  d1:Date=null;
  d2:Date=null;
  showAll:string="showAll"
  isFilterApplied:boolean=false
  constructor(private router:Router,private gs:GetCourseTrainingService) {
    this.columnDefs=[
      {
        headerName:"Course",
        field:"course.title",
        width:150,
        sortingOrder:["asc","desc",null],
      },
      {
        headerName:"Batch Code",
        field:"batchcode",
        width:110,
        sortingOrder:["asc","desc",null],
      },
      {
        headerName:"Title",
        field:"title",
        width:150,
        sortingOrder:["asc","desc",null],
      },
      {
        headerName:"ATC",
        field:"trainingATC",
        width:110,
        sortingOrder:["asc","desc",null],
      },
      {
       headerName:"Trainer",
       field:"trainer",
       width:150,
       sortingOrder:["asc","desc",null]
     },
     
     {
       headerName:"Start Date",
       field:"startDate",
       width:130,
       sortingOrder:["asc","desc",null]
     },
     {
       headerName:"End Date",
       field:"endDate",
       width:130,
       sortingOrder:["asc","desc",null]
     },
     {
       headerName:"Start Time",
       field:"startTime",
       width:130,
       sortingOrder:["asc","desc",null]
     },
     {
       headerName:"End Time",
       field:"endTime",
       width:130,
       sortingOrder:["asc","desc",null]
     },
     {
       headerName:"Status",
       field:"status",
       width:130,
       sortingOrder:[null]
     },
     {
       headerName:"Edit Training",
       width:120,
       cellRendererFramework:CellCustomComponent
     },
    ];
   }
   filterForm:FormGroup;
  ngOnInit(): void {
    this.filterForm=new FormGroup({
      'course' :new FormControl(null,[Validators.required]),
      'startDate' : new FormControl(null,[Validators.required]),
      'endDate' : new FormControl(null,[Validators.required]),
   });
    
   this.gs.getCourses().subscribe(
     res=>this.CoursesList=res,
     err=>alert("Opps! Error")
   )
   this.gs.getTrainings().subscribe(
    res=>this.TrainingList=res,
    err=>alert("Opps! Error")
  )

  }
  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi=params.columnApi;
    let dataValue=this.TrainingList;
    params.api.setRowData(dataValue);
  }

  // onSubmit(createForm:FormGroupDirective){
  //       createForm.reset();
  //       //console.log(this.createForm.get('dateRange').value);
  // }
  categoryNo:any=null;
  // check(num){
  //     console.log(this.categoryNo);
  //      if(num==this.categoryNo)return true;
  //      else return false;
  // }
  // category(num:number){
  //     this.categoryNo=num;
  // }

  // onClick(id){
  //   this.route.navigate(['view-training',id]);
  // }

  filterTrainingsOfId(){
    
    if(this.filterForm.get('course').value !="showAll" && this.d1!=null && this.d2!=null){
    //console.log(this.filterForm.get('course').value+"6");
    return this.TrainingList.filter(x=>{
      let tmp1:Date=new Date(x.startDate);
      let tmp2:Date=new Date(x.endDate);
      if(x.course.id==this.filterForm.get('course').value && tmp1>=this.d1 && tmp2<=this.d2)return true;
    });
    }
    else if(this.filterForm.get('course').value !="showAll" && this.d1!=null){
     // console.log(this.filterForm.get('course').value+"5");
      return this.TrainingList.filter(x=>{
        let tmp1:Date=new Date(x.startDate);
        if(x.course.id==this.filterForm.get('course').value && tmp1>=this.d1)return true;
      });
    }
    else if(this.filterForm.get('course').value !="showAll" && this.d2!=null){
     // console.log(this.filterForm.get('course').value+"4");
      return this.TrainingList.filter(x=>{
        let tmp2:Date=new Date(x.startDate);
        if(x.course.id==this.filterForm.get('course').value && tmp2<=this.d2)return true;
      });
    }
    else if(this.d1!=null && this.d2!=null){
      console.log(this.filterForm.get('course').value+"3");
      return this.TrainingList.filter(x=>{
        let tmp1:Date=new Date(x.startDate);
        let tmp2:Date=new Date(x.endDate);
        if(tmp1>=this.d1 && tmp2<=this.d2)return true;
      });
    }
    else if(this.d1!=null){
     // console.log(this.filterForm.get('course').value+"2");
      return this.TrainingList.filter(x=>{
        let tmp1:Date=new Date(x.startDate);
        if(tmp1>=this.d1)return true;
      });
    }
    else if(this.d2!=null){
     // console.log(this.filterForm.get('course').value +"1");
      return this.TrainingList.filter(x=>{
        let tmp2:Date=new Date(x.endDate);
        if(tmp2<=this.d2)return true;
      });
    }
    else if(this.filterForm.get('course').value !="showAll"){
      return this.TrainingList.filter(x=>x.course.id==this.filterForm.get('course').value)
    }
    else{
      return this.TrainingList
    }
}
onApply(){
  //console.log(this.filterForm.get('startDate').value);
  if(this.filterForm.get('startDate').value!=null && this.filterForm.get('startDate').value!="")
  this.d1=new Date(this.filterForm.get('startDate').value);
  else this.d1=null;
  if(this.filterForm.get('endDate').value!=null && this.filterForm.get('endDate').value!="")
  this.d2=new Date(this.filterForm.get('endDate').value);
  else this.d2=null;
  
  this.gridApi.setRowData([]);
  this.gridApi.updateRowData({add:this.filterTrainingsOfId()});
  //console.log(this.filterForm.get('course').value+"->"+this.d1+"->"+this.d2);
}
}