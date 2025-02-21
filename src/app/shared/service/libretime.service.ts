import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LibretimeService {

  private apiUrl = 'https://a2.asurahosting.com/api/nowplaying/project_dm';

  constructor(private http: HttpClient) { }

  getLiveInfo(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching metadata:', error);
        return throwError(() => new Error('Failed to fetch metadata.'));
      })
    );
  }
}
