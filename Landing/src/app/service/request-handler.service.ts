import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Notiflix from 'notiflix';
import { throwError, Observable, retry, catchError } from 'rxjs';
import { LeadService } from './lead.service';

@Injectable({
  providedIn: 'root'
})
export class RequestHandlerService {
  messages: string[] = [];

  addMsg(message: string){
    this.messages.push(message)
  }
  clearMsg(){
    this.messages = [];
  }

  private handleError(error: HttpErrorResponse) {
    console.warn(error)
    if(error.error.detail){
      this.addMsg(error.error.detail);
    }
    if(error.error.name){
      this.addMsg(error.error.name)
    }
    if(error.error.email){
      this.addMsg(error.error.email)
    }
    if(error.error.subject){
      this.addMsg(error.error.subject)
    }
    if(error.error.message){
      this.addMsg(error.error.message)
    }
    setTimeout(() => {
      this.clearMsg();
    }, 20000)
    
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      Notiflix.Loading.remove()
      Notiflix.Report.failure(
        'Sorry!',
        'An error occured',
        'Okay',
      )
    } else if (error.status === 400){
      Notiflix.Loading.remove()
      Notiflix.Report.failure(
        error.statusText,
        'Please fix the highlighted errors and try again',
        'Okay',
      )
    }  else if (error.status === 401){
      if (error.error.detail){
        Notiflix.Loading.remove()
        Notiflix.Report.warning(
          error.statusText,
          error.error.detail,
          'Okay',
        ) 
      } else {
        Notiflix.Report.warning(
          error.statusText,
          'An error occured',
          'Okay',
        )
      }
    } else if (error.status === 403){
      Notiflix.Loading.remove()
      Notiflix.Report.warning(
        error.statusText,
        'Sorry, you do not have permission to view or modify the requested resource',
        'Okay',
      )
    } else if (error.status === 404){
      Notiflix.Loading.remove()
      Notiflix.Report.warning(
        error.statusText,
        'Seems you are not logged in, or your session expired. Please login to continue',
        'Okay',
      )
    }  else if (error.status === 408 || 504){
      Notiflix.Loading.remove()
      Notiflix.Report.warning(
        error.statusText,
        "An error occured",
        'Okay',
      )
      // location.reload();
    } else if (error.status === 500 || 501 || 503){
      Notiflix.Loading.remove()
      Notiflix.Report.warning(
        error.statusText,
        'Sorry, we ran into a problem while processing your request. Please try again',
        'Okay',
      )
    } else {
      
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      Notiflix.Loading.remove()
      Notiflix.Report.failure(
        error.statusText,
        'Sorry, we ran into a problem while processing your request. Please try again',
        'Okay',
      )
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  constructor(
    private http:HttpClient,
  ) { }
  handlePOST<T>(apiURL: string, payload?, options?): Observable<any>{
    return this.http.post<T>(apiURL, payload, options).pipe(
      retry(3),
      catchError(
        (err) => this.handleError(err)
      )
    )
  }
}
