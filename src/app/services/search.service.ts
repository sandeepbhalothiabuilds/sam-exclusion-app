import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchUrl = 'http://localhost:5001/sam/exclusion/search'; // API endpoint

  constructor(private http: HttpClient) { }

  search(criteria: any): Observable<any> {
    return this.http.post<any>(this.searchUrl, criteria);
  }
}
