import { ViewTrainingComponent } from './view-training/view-training.component';
import { CreateTrainingComponent } from './create-training/create-training.component';
import { TrainingComponent } from './training/training.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { RouteGuardService } from './service/route-guard.service';
import { ViewCourseComponent } from './view-course/view-course.component';
import { CoursesComponent } from './courses/courses.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewNominationsComponent } from './view-nominations/view-nominations.component';
import { UploadNominationsComponent } from './upload-nominations/upload-nominations.component';
import { UploadAttendenceComponent } from './upload-attendence/upload-attendence.component';
import { ViewAttendenceComponent } from './view-attendence/view-attendence.component';
import { EditNominationsComponent } from './edit-nominations/edit-nominations.component';
import { ReportComponent } from './report/report.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path:'' , component:LoginUserComponent },
  {path:'home' ,component:HomeComponent,canActivate:[RouteGuardService]},
  {path:'about' ,component:AboutComponent },
  {path:'login-user' ,component:LoginUserComponent},
  {path:'show-courses' ,component:CoursesComponent,canActivate:[RouteGuardService]},
  {path:'view-course/:id' ,component:ViewCourseComponent,canActivate:[RouteGuardService]},
  {path:'create/:id' ,component:CreateCourseComponent,canActivate:[RouteGuardService]},
  {path:'createTraining/:id',component:CreateTrainingComponent,canActivate:[RouteGuardService]},
  {path:'show-training',component:TrainingComponent,canActivate:[RouteGuardService]},
  {path:'view-training/:id' ,component:ViewTrainingComponent,canActivate:[RouteGuardService]},
  {path:'viewnom',component:ViewNominationsComponent,canActivate:[RouteGuardService]},
  {path:'uploadnom',component:UploadNominationsComponent,canActivate:[RouteGuardService]},
  {path:'uploadatt',component:UploadAttendenceComponent,canActivate:[RouteGuardService]},
  {path:'viewatt',component:ViewAttendenceComponent,canActivate:[RouteGuardService]},
  {path:'editNomination/:id',component:EditNominationsComponent,canActivate:[RouteGuardService]},
  {path:'report' ,component:ReportComponent,canActivate:[RouteGuardService]},
  {path:'signup' ,component:SignupComponent,canActivate:[RouteGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
