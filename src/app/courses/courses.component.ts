import { GetCourseTrainingService } from './../service/get-course-training.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  cards=[];
  constructor(private router:Router,private gs:GetCourseTrainingService) { }

  ngOnInit(): void {
    this.gs.getCourses().subscribe(res=>{
      this.cards=res;
    },
    err=>{
      alert("Error!")
    });
  }

  onClick(id){
    this.router.navigate(['/view-course',id]);
  }
  toggle(){
    
    $('#sidebar').toggleClass('active');
    $('#sidebarCollapse').toggleClass('active');

}
}

