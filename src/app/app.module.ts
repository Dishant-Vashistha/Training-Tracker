import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TrainingComponent } from './training/training.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateTrainingComponent } from './create-training/create-training.component';
import { ViewTrainingComponent } from './view-training/view-training.component';
import { UploadNominationsComponent } from './upload-nominations/upload-nominations.component';
import { ViewNominationsComponent } from './view-nominations/view-nominations.component';
import { ViewAttendenceComponent } from './view-attendence/view-attendence.component';
import { UploadAttendenceComponent } from './upload-attendence/upload-attendence.component';
import { EditNominationsComponent } from './edit-nominations/edit-nominations.component';
import {AgGridModule} from 'ag-grid-angular';
import { CellCustomComponent } from './cell-custom/cell-custom.component';
import { ReportComponent } from './report/report.component';
import { SignupComponent } from './signup/signup.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    LoginUserComponent,
    CoursesComponent,
    HomeComponent,
    AboutComponent,
    ViewCourseComponent,
    CreateCourseComponent,
    TrainingComponent,
    CreateTrainingComponent,
    ViewTrainingComponent,
    UploadNominationsComponent,
    ViewNominationsComponent,
    ViewAttendenceComponent,
    UploadAttendenceComponent,
    EditNominationsComponent,
    CellCustomComponent,
    ReportComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  providers: [DatePipe],
  entryComponents:[CellCustomComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
