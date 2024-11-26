import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Student } from '../entities/student.entity';
import { StudentService } from '../services/student.service';
import { CourseService } from '../services/course.service';
import { Course } from '../entities/course.entity';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ],
  host: {
    'collision-id': 'AddCourseComponent'
},
  templateUrl: './add.component.html'

})
export class AddCourseComponent {
  formAdd: FormGroup;
  id: number;
  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute

  ){}

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(s => {
      this.id = parseInt(s.get('StuId'));
      console.log(this.id);

      this.studentService.findById(this.id).then(
          res => {

            let course = res as Course
              this.formAdd = this.formBuilder.group({
                stuid: course.stuId,
                courName: '',
                courScore: ''
              });
          },
          err => {
              console.log(err);
          }
      );
  });


}


save() {
  console.log(this.formAdd.value);
  let s = JSON.stringify(this.formAdd.value);
  let formData = new FormData();
  formData.append("coursejson", s);
  this.courseService.create(formData).then(
      res => {
          if (res['result']) {
              this.router.navigate(['/course-list',{StuId:this.id}]);
          } else {
              console.log("Failed");
          }
      },
      error => {
          console.log(error);
      }
  );
}
}
