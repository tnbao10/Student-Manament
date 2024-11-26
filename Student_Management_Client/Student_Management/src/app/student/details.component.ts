import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
    'collision-id': 'StudentDetailsComponent'
},
  templateUrl: './details.component.html'

})
export class StudentDetailsComponent {
  formGroup: FormGroup;

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
        StuName: '',
        StuAddr: '',
        StuPhone: '',
        StuDob: ''  
    });
}


save() {
  let s = JSON.stringify(this.formGroup.value);
  let formData = new FormData();
  formData.append("studentjson", s);
  this.studentService.create(formData).then(
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
