import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import * as Notiflix from 'notiflix';
import { LeadService } from 'src/app/service/lead.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  errName = '';
  errEmail = '';
  errDetail = '';
  err: any;
  statusText = '';

  constructor(
    private leadService:LeadService,
    private recaptchaV3Service: ReCaptchaV3Service,
  ) { }

  ngOnInit(): void {
  }
  subscribe(subsData: any){
    Notiflix.Loading.pulse('Sending request... please wait.')
    this.leadService.newsletterSubs(subsData).subscribe({
      next: (data) => {
        Notiflix.Loading.remove()
        Notiflix.Report.success(
          'Subscription successful!',
          'Thank you for subscribing to the HeartSnArt Monthly Newsletter. We have successfully added you to our list. Stay tuned!',
          'Cool!'
        )
        this.errDetail = '';
        this.statusText = '';
        this.errName = '';
        this.errEmail = '';
        this.recaptchaV3Service.execute('recaptcha').subscribe(
          (token) => {
            console.warn("recaptcha token:",token)
          } 
        );
      }, 
      error: (err) => {
        Notiflix.Loading.remove()
        console.warn(err)
        this.errDetail = err.error.detail 
        this.statusText = err.statusText 
        this.errName = err.error.name 
        this.errEmail = err.error.email 
        if (this.errDetail && this.statusText){
          Notiflix.Report.failure(
            this.statusText,
            this.errDetail,
            'Okay',
          )
        } else if (this.statusText && this.statusText == 'Unknown Error'){
          Notiflix.Report.failure(
            this.statusText,
            'Please try again.',
            'Okay',
          )
        } else if (this.statusText){
          Notiflix.Report.failure(
            this.statusText,
            'Please fix the highlighted issues and try again.',
            'Okay',
          )
        }
      }
    })
  }

}
