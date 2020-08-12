import { CourseTrainingService } from './../service/course-training.service';
import { LoginServiceService } from './../service/login-service.service';
import { GetCourseTrainingService } from './../service/get-course-training.service';
import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  dateConfig:Partial<BsDatepickerConfig>;
  
  CoursesList=[];
  Title:string
  id:any;
  disableUpdate:boolean=false;
  constructor(private route:ActivatedRoute,private gs:GetCourseTrainingService,private cT:CourseTrainingService,private ls:LoginServiceService) {
    
    this.gs.getCourses().subscribe(
      res=>this.CoursesList=res,
      err=> alert("Error!")
    );

    this.dateConfig=Object.assign({},{
      containerClass:'theme-dark-blue',
      showWeekNumbers:false,
      minDate :new Date(2020,0,1),
      dateInputFormat: 'DD/MM/YYYY'
    });

   }
  createForm:FormGroup;
  
   tmp:any={};
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    
    //this.id1=this.route.snapshot.paramMap.get('id');
    if(this.id==0){
      this.disableUpdate=true;
      this.Title="Create"
      this.createForm=new FormGroup({
        'title' : new FormControl(null,[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]*$"),Validators.minLength(3)]),
        'duration': new FormControl(null,[Validators.required]),
        'description' : new FormControl(null,[Validators.required,Validators.pattern("^[a-zA-Z0-9, ]*$"),Validators.minLength(5)]),
        'preRequisites' : new FormControl(null,[Validators.required,Validators.pattern("^[a-zA-Z0-9, ]*$"),Validators.minLength(5)]),
        'isLabApplicable':new FormControl(false)
     });
    }
    else{
      this.disableUpdate=false;
      this.Title="Edit";
      this.createForm=new FormGroup({
        'title' : new FormControl(this.tmp.title,[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]*$"),Validators.minLength(3)]),
        'duration': new FormControl(this.tmp.duration,[Validators.required]),
        'description' : new FormControl(this.tmp.description,[Validators.required,Validators.pattern("^[a-zA-Z0-9, ]*$"),Validators.minLength(5)]),
        'preRequisites' : new FormControl(this.tmp.preRequisites,[Validators.required,Validators.pattern("^[a-zA-Z0-9, ]*$"),Validators.minLength(5)]),
        'isLabApplicable':new FormControl(this.tmp.isLabApplicable)
     });
      let formData:FormData =new FormData();
    
      formData.append("id",this.id);
   
       this.gs.getCourse(formData).subscribe(
         res=>{this.tmp=res
          this.createForm.get('title').setValue(this.tmp.title);
          this.createForm.get('duration').setValue(this.tmp.duration);
          this.createForm.get('description').setValue(this.tmp.description);
          this.createForm.get('preRequisites').setValue(this.tmp.preRequisites);
          console.log();
          
          if(this.tmp.isLabApplicable==="false ")
          this.createForm.get('isLabApplicable').setValue(false);
          else
          this.createForm.get('isLabApplicable').setValue(true);
        },
     err=>alert("Error")
     );
      
    }
  }
  onSubmit(createForm:FormGroupDirective){
    let course: FormData = new FormData();
    course.append("title", this.createForm.get('title').value);
    course.append("duration", this.createForm.get('duration').value);
    course.append("description", this.createForm.get('description').value);
    course.append("preRequisites", this.createForm.get('preRequisites').value);
    course.append("isLabApplicable", this.createForm.get('isLabApplicable').value+" ");
    course.append("createdBy",this.ls.getUserName().fname);
    this.cT.createCourse(course);
    createForm.reset();
  }

  onUpdate(createForm:FormGroupDirective){
    let course: FormData = new FormData();
    course.append("title", this.createForm.get('title').value);
    course.append("duration", this.createForm.get('duration').value);
    course.append("description", this.createForm.get('description').value);
    course.append("preRequisites", this.createForm.get('preRequisites').value);
    course.append("isLabApplicable", this.createForm.get('isLabApplicable').value+" ");
    course.append("updatedBy",this.ls.getUserName().fname);
    course.append("id",this.id);
    //console.log(this.id);
    this.cT.updateCourse(course)
    createForm.reset();
  }

}
