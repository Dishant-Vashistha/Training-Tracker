// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  getCourseById:'http://localhost:8080/Course/CourseByID',
  getCourses:'http://localhost:8080/Course/Show',
  createCourse:'http://localhost:8080/Course',
  editCourse:'http://localhost:8080/Course/Update',
  deleteCourse:'http://localhost:8080/Course/Delete',
  _getbyid:'http://localhost:8080/Training/findById',
  _deletetrainingurl:'http://localhost:8080/Training/delete',
  _getrainings:'http://localhost:8080/Training/showAll',
  getNominationid:'http://localhost:8080/nomin/findById',
  getTierReport:'http://localhost:8080/nomin/getTierreport',
  getAtcReport:'http://localhost:8080/nomin/getATCreport',
  uploadNom:"http://localhost:8080/nomin/uploadFile",
  uploadAtt:"http://localhost:8080/attendance/uploadAttendance",
  viewNom:'http://localhost:8080/nomin/search',
  sendMail:'http://localhost:8080/nomin/sendEmailList',
  viewAtt:'http://localhost:8080/attendance/showAttendance',
  createtraining:'http://localhost:8080/Training/add',
  updateTraining:'http://localhost:8080/Training/update',
  updateNominationurl:'http://localhost:8080/nomin/add-edit'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
