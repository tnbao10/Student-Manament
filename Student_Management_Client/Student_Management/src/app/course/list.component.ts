import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { StudentService } from '../services/student.service';
import { CourseService } from '../services/course.service';
import { FormsModule } from "@angular/forms";
import { Student } from '../entities/student.entity';
import { Course } from '../entities/course.entity';
import id from '@angular/common/locales/id';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterOutlet,
    CommonModule  
    
  ],
  host: {
    'collision-id': 'CourseListComponent'
},
  templateUrl: './list.component.html'

})
export class CourseListComponent {
  students : Student[];
  keyword: string;
  courses : Course[];
  course: Course;
  totalScore : number;
  studentId : number;
  stuId: number;
  score: number;
  classification: string; // Thêm biến lưu xếp loại


  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,


  ){}
  averageScore: number;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      let id = parseInt(p.get('StuId'));
      console.log(id);
      
      // Lấy danh sách các khóa học dựa trên StuId
      this.courseService.findByStuId(id).then(
        res => {
          this.courses = res as Course[];
          // Tính điểm trung bình sau khi có dữ liệu khóa học
          this.calculateAverageScore();
        },
        error => {
          console.log(error);
        }
      );

      this.studentService.findAll().then(
        res => {
            let student = res as Student[];
            this.studentId  =  Number(id);
            console.log(this.studentId);
        },
        error => {
            console.log(error);
        }
      );
    });
  }

  
  calculateAverageScore() {
    if (this.courses && this.courses.length > 0) {
      this.totalScore = 0;
      this.courses.forEach(course => {
        console.log(course.courScore, typeof course.courScore);
  
        // Chuyển đổi courScore thành số nếu có thể
        let score = Number(course.courScore);
  
        // Kiểm tra xem score có phải là số hợp lệ không
        if (!isNaN(score)) {
          this.totalScore += score;
        } else {
          console.warn(`Invalid score value: ${course.courScore}`);
        }
  
        console.log(this.totalScore);
      });
  
      // Tính điểm trung bình
      this.averageScore = this.totalScore / this.courses.length;
      if(this.averageScore >= 8) 
        this.classification = 'Tốt';
      else if(this.averageScore >= 6.5 && this.averageScore < 8)
        this.classification = 'Khá';
      else if(this.averageScore >= 5 && this.averageScore < 6.5)
        this.classification = 'Trung Bình';
      else{
        this.classification = 'Yếu';
      }
    } else {
      // Nếu không có khóa học hoặc danh sách rỗng, đặt điểm trung bình là 0
      this.averageScore = 0;
    }
  }
  
  search1() {
    this.activatedRoute.paramMap.subscribe(p => {
      this.stuId = parseInt(p.get('StuId'));
      console.log(this.stuId);
      
      this.courseService.findByKeyword1(this.keyword, this.stuId).then(
        res => {
            this.courses = res as Course[];
        },
        error => {
            console.log(error);
        }
    );


    });
}

searchByScore() {
  this.activatedRoute.paramMap.subscribe(p => {
    this.stuId = parseInt(p.get('StuId'));
    console.log(this.stuId);
    
    this.courseService.findByScore(this.score, this.stuId).then(
      res => {
          this.courses = res as Course[];
      },
      error => {
          console.log(error);
      }
  );
  });
}

  search() {
    
    this.courseService.findByKeyword(this.keyword).then(
        res => {
            this.courses = res as Course[];
        },
        error => {
            console.log(error);
        }
    );
}



delete(id: any) {
  let result = confirm('Do you want to delete ?');
  if (result) {
      this.courseService.delete(id).then(
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



