import { CourseTrainingService } from './../service/course-training.service';
import { LoginServiceService } from './../service/login-service.service';
import { GetCourseTrainingService } from './../service/get-course-training.service';
import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-edit-nominations',
  templateUrl: './edit-nominations.component.html',
  styleUrls: ['./edit-nominations.component.css']
})
export class EditNominationsComponent implements OnInit {

  CoursesList=[];
  Title:string
  id:any;
  disableUpdate:boolean=false;
  constructor(private route:ActivatedRoute,private gs:GetCourseTrainingService,private cT:CourseTrainingService,private ls:LoginServiceService,private router:Router) {
    

   }
  createForm:FormGroup;
  
   tmp:any={};
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    
      this.disableUpdate=false;
      this.Title="Edit";
      this.createForm=new FormGroup({
        'employeeId' : new FormControl(this.tmp.employeeId,[Validators.required,Validators.pattern("^[0-9 ]*$"),Validators.minLength(7)]),
        'employeeFullname' :  new FormControl(this.tmp.employeeFullname,[Validators.required]),
        'employeeMailId' : new FormControl(this.tmp.employeeMailId,[Validators.required]),
        'primaryskill': new FormControl(this.tmp.employeeMailId,[Validators.required]),
        'secondaryskill': new FormControl(this.tmp.employeeMailId,[Validators.required]),
        'Java': new FormControl(this.tmp.Java,[Validators.required])
     });
      let formData:FormData =new FormData();
    
      formData.append("Id",this.id);
   
       this.gs.getNomination(formData).subscribe(
         res=>{this.tmp=res
          this.createForm.get('employeeId').setValue(this.tmp.empId);
          this.createForm.get('employeeFullname').setValue(this.tmp.empName);
          this.createForm.get('employeeMailId').setValue(this.tmp.empEmail);
          this.createForm.get('primaryskill').setValue(this.tmp.primarySkill);
          this.createForm.get('secondaryskill').setValue(this.tmp.secondarySkill);
          this.createForm.get('Java').setValue(this.tmp.basicJava);
        },
     err=>alert("Error")
     );
      
    
  }
 

  onUpdate(createForm:FormGroupDirective){
    let course: FormData = new FormData();
    course.append("empId", this.createForm.get('employeeId').value);
    course.append("empName", this.createForm.get('employeeFullname').value);
    course.append("empEmail", this.createForm.get('employeeMailId').value);
    course.append("primarySkill", this.createForm.get('primaryskill').value);
    course.append("secondarySkill", this.createForm.get('secondaryskill').value);
    course.append("updatedBy",this.ls.username);
    course.append("id",this.id);
    course.append("basicJava",this.createForm.get('Java').value)
    this.cT.updateNomination(course).subscribe(
      res=>{alert("Updated Successfully")
    this.router.navigate(['/viewnom'])
    }
      ,
      err=>alert("Opps! Error!")
      )
    createForm.reset();
  }

}
