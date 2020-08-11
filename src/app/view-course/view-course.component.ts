import { GetCourseTrainingService } from './../service/get-course-training.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {
  
  //CourseListMap : Map<number, any> = new Map<number,any>();
  course:any={};
  isLabApplicable:string;
  constructor(private route:ActivatedRoute,private router:Router,private gs:GetCourseTrainingService) { }
  id:any;
  ngOnInit(): void {
    let formData:FormData =new FormData();
    
    this.id=this.route.snapshot.paramMap.get('id');
    formData.append("id",this.id);
 
    this.gs.getCourse(formData).subscribe(res=>{
         this.course=res;
    if(this.course.isLabApplicable==="false "){
      this.isLabApplicable="No";
    }
    else this.isLabApplicable="Yes";
    },
    err=>{
      alert("Error");
    })

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
  this.router.navigate(['/create',this.id]);
}

onDelete(){
  let formData:FormData = new FormData();
  formData.append('id',this.id)
  this.gs.deleteCourse(formData).subscribe(res=>{
    alert("Course Deleted Successfully");
    this.router.navigate(["home"])
  },
  err=>{
    alert("Opps! Error!");
  });}

}
