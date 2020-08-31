import { DatePipe } from '@angular/common';
import { LoginServiceService } from './../service/login-service.service';
import { CourseTrainingService } from './../service/course-training.service';
import { GetCourseTrainingService } from '../service/get-course-training.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.css']
})
export class CreateTrainingComponent implements OnInit {
  dateConfig:Partial<BsDatepickerConfig>;
  
  errorMessage:String="Invalid Date or Time";
  skillset=[{title:"Angular"}];
  CoursesList:any=[]
  Title:string
  id:any;
  disableUpdate:boolean=false;
  inValid:boolean=false;
  constructor(private route:ActivatedRoute,private gs:GetCourseTrainingService , private cT:CourseTrainingService,
    private ls:LoginServiceService,private datepipe:DatePipe) {
    
    this.gs.getCourses().subscribe(res=>{
      this.CoursesList=res;
    },
    err=>{
      alert("Error!")
    });
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
    if(this.id==0){
      this.disableUpdate=true;
      this.Title="Create"
      this.createForm=new FormGroup({
        'course' :new FormControl(null,[Validators.required]),
        'title' : new FormControl(null,[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]*$"),Validators.minLength(3)]),
        'ATC' : new FormControl(null,[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]*$"),Validators.minLength(3)]),
        'trainer': new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z ]*")]),
        'skillset': new FormControl(null),
        'startDate' : new FormControl(null,[Validators.required,this.ValidateDate]),
        'endDate' : new FormControl(null,[Validators.required,this.ValidateDate]),
        'startTime' : new FormControl(null,[Validators.required]),
        'endTime' : new FormControl(null,[Validators.required]),
     });
    }
    else{
      this.disableUpdate=false;
      this.Title="Edit";
      this.createForm=new FormGroup({
        'course' :new FormControl(null,[Validators.required]),
        'title' : new FormControl(null,[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]*$"),Validators.minLength(3)]),
        'ATC' : new FormControl(null,[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]*$"),Validators.minLength(3)]),
        'trainer': new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z ]*")]),
        'skillset': new FormControl(null),
        'startDate' : new FormControl(null,[Validators.required,this.ValidateDate]),
        'endDate' : new FormControl(null,[Validators.required,this.ValidateDate]),
        'startTime' : new FormControl(null,[Validators.required]),
        'endTime' : new FormControl(null,[Validators.required]),
     });
     //ababababab
     let formData:FormData =new FormData();
    
      formData.append("id",this.id);
   
       this.gs.getTraining(formData).subscribe(
         res=>{this.tmp=res
          this.createForm.get('course').setValue(this.tmp.course.id);
          this.createForm.get('title').setValue(this.tmp.title);
          this.createForm.get('ATC').setValue(this.tmp.trainingATC);
          this.createForm.get('trainer').setValue(this.tmp.trainer);
          this.createForm.get('startDate').setValue(this.tmp.startDate);
          this.createForm.get('endDate').setValue(this.tmp.endDate);
          this.createForm.get('startTime').setValue(this.tmp.startTime);
          this.createForm.get('endTime').setValue(this.tmp.endTime);
          this.createForm.get('skillset').setValue(this.tmp.reqSkills);
        },
     err=>alert("Error")
     );
      
    }
    }

  onSubmit(createForm:FormGroupDirective){
        let formData:FormData=new FormData();
         console.log((this.datepipe.transform(this.createForm.get('startDate').value,'dd-MM-yyyy')))
        formData.append("course.id",(this.createForm.get('course').value));
        formData.append("title",(this.createForm.get('title').value));
        formData.append("trainingATC",(this.createForm.get('ATC').value));
        formData.append("trainer",(this.createForm.get('trainer').value));
        formData.append("startDate",this.datepipe.transform(this.createForm.get('startDate').value,'dd-MM-yyyy'));
        formData.append("endDate",this.datepipe.transform(this.createForm.get('endDate').value,'dd-MM-yyyy' ));
        formData.append("startTime",(this.createForm.get('startTime').value));
        formData.append("endTime",(this.createForm.get('endTime').value));
        formData.append("createdBy",this.ls.getUserName().fname);
        formData.append("reqSkills",(this.createForm.get('skillset').value));
      
        let d1:Date =new Date(this.createForm.get('startDate').value);
        let d2:Date =new Date(this.createForm.get('endDate').value);

        let t1=this.createForm.get('startTime').value;
        let t2=this.createForm.get('endTime').value;
        if(d1>d2 || t1>t2 ){
          this.inValid=true;
        }
        else{
        this.cT.createTraining(formData)
        createForm.reset();
        this.inValid=false;
        }
  }
  
  onUpdate(createForm:FormGroupDirective){
    let training: FormData = new FormData();
    training.append("title", this.createForm.get('title').value);
    training.append("trainingATC",(this.createForm.get('ATC').value));
    training.append("trainer", this.createForm.get('trainer').value);
    training.append("startDate",this.datepipe.transform(this.createForm.get('startDate').value,'dd-MM-yyyy'));
    training.append("endDate",this.datepipe.transform(this.createForm.get('endDate').value,'dd-MM-yyyy'));
    training.append("startTime", this.createForm.get('startTime').value);
    training.append("endTime", this.createForm.get('endTime').value);
    training.append("updatedBy",this.ls.getUserName().fname);
    training.append("id",this.id);
    training.append("course.id",(this.createForm.get('course').value));
    training.append("reqSkills",(this.createForm.get('skillset').value));
    
    let d1:Date =new Date(this.createForm.get('startDate').value);
    let d2:Date =new Date(this.createForm.get('endDate').value);

    let t1=this.createForm.get('startTime').value;
    let t2=this.createForm.get('endTime').value;
    if(d1>d2 || t1>t2 ){
      this.inValid=true;
    }
    else{
    this.cT.updateTraining(training);
    createForm.reset();
    this.inValid=false;
    }
  }

  ValidateDate(control: AbstractControl): {[key: string]: any} | null  {
    let d1=new Date(control.value);
    let d2=new Date(Date.now());
    if (d2.getFullYear()>d1.getFullYear() || (d2.getMonth()>d1.getMonth() && d2.getFullYear()==d1.getFullYear() ) 
        || (d2.getDate() > d1.getDate() && (d2.getMonth()==d1.getMonth()) && d2.getFullYear()==d1.getFullYear())) {
      return { 'DateInvalid': true };
    }
    return null;
  }
}