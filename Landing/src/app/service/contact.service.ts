import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiURL = ''

  constructor(
    private http:HttpClient,
  ) { }

  // sendMessage(contactData: any): Observable<any>{
  //   return this.http.post<any>(this.apiURL, contactData);
  // }
}
