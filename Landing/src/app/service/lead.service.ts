import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiURL = 'http://127.0.1:8000/api/'
// const apiURL = 'https://'

@Injectable({
  providedIn: 'any'
})
export class LeadService {
  
  contactURL = apiURL + 'contact/'
  subsURL = apiURL + 'subscribe/'

  constructor(
    private http:HttpClient,
  ) { }

  sendMsg(msgData: any): Observable<any>{
    return this.http.post<any>(this.contactURL, msgData)
  }
  newsletterSubs(subsData: any): Observable<any>{
    return this.http.post<any>(this.subsURL, subsData)
  }
}
