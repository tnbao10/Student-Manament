import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SubjectComponent } from './subject.component';
import { StudentComponent } from './student.component';
import { AddStudentComponent } from './student/add.component';
import { EditStudentComponent } from './student/edit.component';
import { StudentListComponent } from './student/list.component';
import { AddCourseComponent } from './course/add.component';
import { EditCourseComponent } from './course/edit.component';
import { CourseListComponent } from './course/list.component';

export const routes: Routes = [
    {
        path:'',
        component: StudentListComponent
    },

    {
        path:'student-list',
        component: StudentListComponent
    },

    {
        path:'add-student',
        component: AddStudentComponent
    },
    {
        path:'edit-student',
        component: EditStudentComponent
    },
    {
        path:'course-list',
        component: CourseListComponent
    },
    {
        path:'add-course',
        component: AddCourseComponent
    },
    {
        path:'edit-course',
        component: EditCourseComponent
    }
];
