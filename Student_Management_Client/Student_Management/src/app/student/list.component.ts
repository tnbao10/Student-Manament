import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StudentService } from '../services/student.service';
import { FormsModule } from "@angular/forms";

import { Student } from '../entities/student.entity';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterOutlet,
    
  ],
  host: {
    'collision-id': 'StudentListComponent'
},
  templateUrl: './list.component.html'

})
export class StudentListComponent {
  students : Student[];
  keyword: string;


  constructor(
    private studentService: StudentService
  ){}

  ngOnInit(){
    this.keyword = '';

    this.studentService.findAll().then(
      res => {
          this.students = res as Student[];
      },
      error => {
          console.log(error);
      }
    );
  }

  search() {
    this.studentService.findByKeyword(this.keyword).then(
        res => {
            this.students = res as Student[];
        },
        error => {
            console.log(error);
        }
    );
}

delete(id: any) {
  let result = confirm('Do you want to delete ?');
  if (result) {
      this.studentService.delete(id).then(
          res => {
              if (res['result']) {
                  this.ngOnInit();
              } else {
                  alert('Delete Failed');
              }
          },
          error => {
              alert('Delete Failed');
          }
      );
  }
}

}



