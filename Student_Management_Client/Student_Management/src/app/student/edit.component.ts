import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Student } from '../entities/student.entity';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ],
  host: {
    'collision-id': 'EditStudentComponent'
},
  templateUrl: './edit.component.html'

})
export class EditStudentComponent {
  formGroup: FormGroup;
  student: Student;

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ){}

  ngOnInit() {
        
    this.activatedRoute.paramMap.subscribe(s => {
        let id = parseInt(s.get('StuId'));
        console.log(id);
        this.studentService.findById(id).then(
            res => {
                this.student = res as Student;
                this.formGroup = this.formBuilder.group({
                    StuId: this.student.stuId,
                    StuName: this.student.stuName,
                    StuAddr: this.student.stuAddr,
                    StuPhone: this.student.stuPhone,
                    StuDob: this.student.stuDob,
                });
            },
            err => {
                console.log(err);
            }
        );
    });   
}

save() {
  let s = JSON.stringify(this.formGroup.value);
  let formData = new FormData();
  formData.append("studentjson", s);
  this.studentService.update(formData).then(
      res => {
          if (res['result']) {
              this.router.navigate(['/student-list']);
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

