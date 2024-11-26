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
    'collision-id': 'EditCourseComponent'
},
  templateUrl: './edit.component.html'

})
export class EditCourseComponent {
  formEdit: FormGroup;
  student: Student;
  course: Course;
  id: number;
  id1: number

  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ){}

  ngOnInit() {
        
    this.activatedRoute.paramMap.subscribe(s => {
        this.id = parseInt(s.get('CourId'));
        this.id1 = parseInt(s.get('StuId'));
        this.courseService.findById(this.id).then(
          
          res => {
                this.course = res as Course;
                this.student = res as Student;
                this.formEdit = this.formBuilder.group({
                    CourId: this.course.courId,
                    CourName: this.course.courName,
                    CourScore: this.course.courScore,
                    StuId: this.student.stuId,

                });
            },
            err => {
                console.log(err);
            }

        );
    });   
}

save() {
  let c = JSON.stringify(this.formEdit.value);
  let formData = new FormData();
  formData.append("coursejson", c);
  this.courseService.update(formData).then(
      res => {
          if (res['result']) {
              this.router.navigate(['/course-list',{StuId:this.id1}]);
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

