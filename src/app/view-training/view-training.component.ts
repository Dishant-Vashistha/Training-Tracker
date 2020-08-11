import { GetCourseTrainingService } from './../service/get-course-training.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-training',
  templateUrl: './view-training.component.html',
  styleUrls: ['./view-training.component.css']
})
export class ViewTrainingComponent implements OnInit {
//CourseListMap : Map<number, any> = new Map<number,any>();
training:any={};
isActive:string;
constructor(private route:ActivatedRoute,private router:Router,private gs:GetCourseTrainingService) { }
id:any;
ngOnInit(): void {
  this.id=this.route.snapshot.paramMap.get('id');
  let formData:FormData = new FormData();
  formData.append('id',this.id);
  this.gs.getTraining(formData).subscribe(res=>{
       this.training=res;
  },
  err=>{
    alert("Error");
  })

  if(this.training.isActive==null){
    this.isActive="No";
  }
  else this.isActive="Yes";
}
toggle(){
  
  $('#sidebar').toggleClass('active');
  $('#sidebarCollapse').toggleClass('active');

}
check(id:any):boolean{
if(id==this.id)
return true;

return false;
}

onEdit(){
this.router.navigate(['createTraining',this.id]);
}

onDelete(){
  let formData:FormData=new FormData();
  formData.append('id',this.id);
  console.log(this.id);
  this.gs.deleteTraining(formData).subscribe(res=>{
    alert("Training Deleted Successfully");
    this.router.navigate(["show-training"]);
  },
  err=>{
    alert("Opps! Error!");
  });
  }


}
