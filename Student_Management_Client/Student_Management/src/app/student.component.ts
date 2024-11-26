import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Student } from './entities/student.entity';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  host: {
    'collision-id': 'StudentComponent'
},
  templateUrl: './student.component.html'

})
export class StudentComponent {
  students : Student[];

  constructor(
    private studentService: StudentService
  ){}

  ngOnInit(){
    this.studentService.findAll().then(
      res => {
          this.students = res as Student[];
      },
      error => {
          console.log(error);
      }
  );
  }
}




