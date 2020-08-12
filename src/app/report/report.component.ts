import { Component, OnInit } from '@angular/core';
import { GetCourseTrainingService } from '../service/get-course-training.service';
import * as XLSX from 'xlsx'; 
import { ReportService } from '../service/report.service';
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
  atcList:any=[];
  tierList:any=[]
  
  constructor(private rs:ReportService) { }

  ngOnInit(): void {
    this.rs.getAtc().subscribe(
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
    this.rs.getTier().subscribe(
      res=>{
        this.tierList=res;
        let obj={primarySkill:"Grand Total",
        tierWiseCalculator:{tier0:0,tier1:0,tier2:0,tier3:0,tier4:0,grandTotal:0}
      }
        
        for(let i=0;i<this.tierList.length;i++){
          obj.tierWiseCalculator.tier0=obj.tierWiseCalculator.tier0+this.tierList[i].tierWiseCalculator.tier0;
          obj.tierWiseCalculator.tier1=obj.tierWiseCalculator.tier1+this.tierList[i].tierWiseCalculator.tier1;
          obj.tierWiseCalculator.tier2=obj.tierWiseCalculator.tier2+this.tierList[i].tierWiseCalculator.tier2;
          obj.tierWiseCalculator.tier3=obj.tierWiseCalculator.tier3+this.tierList[i].tierWiseCalculator.tier3;
          obj.tierWiseCalculator.tier4=obj.tierWiseCalculator.tier4+this.tierList[i].tierWiseCalculator.tier4;
          obj.tierWiseCalculator.grandTotal=obj.tierWiseCalculator.grandTotal+this.tierList[i].tierWiseCalculator.grandTotal;
        }

        this.tierList.push(obj);
      },
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