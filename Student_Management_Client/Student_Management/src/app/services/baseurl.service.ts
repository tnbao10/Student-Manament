import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BaseUrlService {

   public BASE_URL = 'http://localhost:5019/api/';

}