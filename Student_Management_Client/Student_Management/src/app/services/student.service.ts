import { Injectable } from "@angular/core";
import { Student } from "../entities/student.entity";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseUrlService } from "./baseurl.service";

@Injectable({
    providedIn: 'root',

})

export class StudentService{
    constructor(
        private httpClient: HttpClient,
        private baseUrlService: BaseUrlService
    ) {}

    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'student/findAllDTO'));
    }

    async findById(id: number) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'student/finddto/' + id));
    }

    async create(formData: FormData) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL + 'student/createDTO', formData));
    }

    async delete(id: number) {
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BASE_URL + 'student/delete/' + id));
    }

    async update(formData: FormData) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BASE_URL + 'student/updateDTO', formData));
    }

    async findByKeyword(keyword: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'student/findByKeywordDTO/' + keyword));
    }
}