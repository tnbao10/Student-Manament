import { Injectable } from "@angular/core";
import { Student } from "../entities/student.entity";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseUrlService } from "./baseurl.service";

@Injectable({
    providedIn: 'root',

})

export class CourseService{
    constructor(
        private httpClient: HttpClient,
        private baseUrlService: BaseUrlService
    ) {}

    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'course/findAllDTO'));
    }

    async findById(id: number) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'course/finddto/' + id));
    }

    async create(formData: FormData) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL + 'course/createDTO', formData));
    }

    async delete(id: string) {
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BASE_URL + 'course/delete/' + id));
    }

    async update(formData: FormData) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BASE_URL + 'course/updateDTO', formData));
    }

    async findByKeyword(keyword: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'course/findByKeywordDTO/' + keyword));
    }

    async findByKeyword1(keyword: string, stuId: number) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'course/findByKeywordDTO1/' + keyword +'/'+ stuId));
    }

    async findByScore(score: number, stuId: number) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'course/findByScore/' + score +'/'+ stuId));
    }

    async findByStuId(stuId: number) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'course/findByStuId/' + stuId));
    }
}