import { Component, OnInit } from '@angular/core';
import { GetCourseTrainingService } from '../service/get-course-training.service';
import * as XLSX from 'xlsx'; 
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  courses:number=0;
  trainings:number=0;
  candi:number=1000000;
  categoryNo:any;
  trainingNo:any;
  isApplied=false;
  CoursesList=[];
  TrainingList=[];
  atcList:any=[];
  tierList=[{title:"AUS Group",t1:147,t2:35,t3:17,t4:2,total:201},
    {title:"BLR Group",t1:154,t2:35,t3:17,t4:2,total:207},
  {title:"CA Group",t1:147,t2:140,t3:17,t4:2,total:306},
  {title:"CHE Group",t1:147,t2:35,t3:25,t4:2,total:209},
  {title:"CMB Group",t1:526,t2:268,t3:16,t4:33,total:843},
  {title:"DEL Group",t1:153,t2:35,t3:20,t4:2,total:210},
  {title:"Dutch Group",t1:150,t2:35,t3:17,t4:2,total:204},
  {title:"HYD Group",t1:881,t2:498,t3:102,t4:26,total:1507},
  {title:"MUM Group",t1:250,t2:35,t3:17,t4:10,total:312},
  {title:"MY Group",t1:150,t2:40,t3:17,t4:2,total:209},
  {title:"Pune Group",t1:147,t2:120,t3:17,t4:2,total:286},
  {title:"SE Group",t1:149,t2:35,t3:20,t4:3,total:207},
  {title:"UK Group",t1:147,t2:40,t3:17,t4:2,total:206},
  {title:"UAE Group",t1:152,t2:35,t3:22,t4:2,total:211},
  {title:"Grand Total",t1:150,t2:37,t3:17,t4:2,total:206}
]
  filterTrainingsOfId(){
    if(this.categoryNo!=null){
    return this.TrainingList.filter(x=> x.id == this.categoryNo);}
    else return this.TrainingList
  }
  constructor(private gs:GetCourseTrainingService) { }

  ngOnInit(): void {
    this.gs.getAtc().subscribe(
      res=>{
        this.atcList=res;
        let obj={atc:"Grand Total",
        rc:{tier0:0,tier1:0,tier2:0,tier3:0,tier4:0,grandTotal:0}
      }
        
        for(let i=0;i<this.atcList.length;i++){
          obj.rc.tier0=obj.rc.tier0+this.atcList[i].rc.tier0;
          obj.rc.tier1=obj.rc.tier1+this.atcList[i].rc.tier1;
          obj.rc.tier2=obj.rc.tier2+this.atcList[i].rc.tier2;
          obj.rc.tier3=obj.rc.tier3+this.atcList[i].rc.tier3;
          obj.rc.tier4=obj.rc.tier4+this.atcList[i].rc.tier4;
          obj.rc.grandTotal=obj.rc.grandTotal+this.atcList[i].rc.grandTotal;
        }

        this.atcList.push(obj);
      },
      err=>alert("Opps! Error")
    )
    this.gs.getTrainings().subscribe(
     res=>{this.TrainingList=res,this.trainings=this.TrainingList.length;},
     err=>alert("Opps! Error")
   )
   
   
  }

  onApplied(){
    this.isApplied=true;
    this.trainingNo=$("#trainingNo").val();
    let formdata:FormData=new FormData();
    formdata.append('training',this.trainingNo);
    formdata.append('course',this.categoryNo);
    
  }
  isAtc:boolean=true;

  isATC(){
    this.isAtc=true;
  }

  isTierWise(){
      this.isAtc=false;
  }
  fileName='ATC-WISEReport.xlsx';
  fileName2='Tier-wiseReport.xlsx';
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
      exportexcel2(): void 
      {
         /* table id is passed over here */   
         let element = document.getElementById('excel-table2'); 
         const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  
         /* generate workbook and add the worksheet */
         const wb: XLSX.WorkBook = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
         /* save to file */
         XLSX.writeFile(wb, this.fileName2);
        
      }
}