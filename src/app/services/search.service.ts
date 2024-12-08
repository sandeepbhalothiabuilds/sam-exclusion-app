import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private searchUrl = 'http://your-api-endpoint/search';

    constructor(private http: HttpClient) { }

    search(criteria: any): Observable<any> {
        return this.http.post<any>(this.searchUrl, criteria);
    }
}
