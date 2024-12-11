import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchUrl = 'http://ec2-54-87-148-95.compute-1.amazonaws.com:5001/sam/exclusion/search';

  constructor(private http: HttpClient) { }

  search(criteria: any): Observable<any> {
    return this.http.post<any>(this.searchUrl, criteria);
  }
}
