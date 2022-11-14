import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestHandlerService } from './request-handler.service';

const apiURL = 'http://127.0.1:8000/api/'
// const apiURL = 'https://'

@Injectable({
  providedIn: 'any'
})
export class LeadService {
  contactURL = apiURL + 'contact/'
  subsURL = apiURL + 'subscribe/'

  constructor(
    private handler:RequestHandlerService,
  ) { }

  sendMsg(msgData: any): Observable<any>{
    return this.handler.handlePOST<any>(this.contactURL, msgData)
  }
  newsletterSubs(subsData: any): Observable<any>{
    return this.handler.handlePOST<any>(this.subsURL, subsData)
  }
}
