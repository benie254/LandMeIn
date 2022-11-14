import { Component, OnInit } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import * as Notiflix from 'notiflix';
import { LeadService } from 'src/app/service/lead.service';
import { MyErrorStateMatcher } from '../nav/nav.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  isExpanded: boolean = false;
  panelOpenState = false;
  matcher = new MyErrorStateMatcher();
  errMessage = '';
  errName = '';
  errEmail = '';
  errSubject = '';
  errDetail = '';
  err: any;
  statusText = '';

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
    private leadService:LeadService,
  ) { }

  ngOnInit(): void {
  }
  contact(msgData: any){
    Notiflix.Loading.pulse('Sending message... please wait.')
    this.leadService.sendMsg(msgData).subscribe({
      next: (data) => {
        Notiflix.Loading.remove()
        Notiflix.Report.success(
          'Message sent!',
          'Thank you for contacting HeartSnArt. We have successfully delivered your message. Hang tight for a response.',
          'Cool!'
        )
        this.errDetail = '';
        this.statusText = '';
        this.errName = '';
        this.errEmail = '';
        this.errMessage = '';
        this.errSubject = '';
        this.recaptchaV3Service.execute('recaptcha').subscribe(
          (token) => {
            console.warn("recaptcha token:",token)
          } 
        );
      }, 
      error: (err) => {
        Notiflix.Loading.remove()
        this.errDetail = err.error.detail 
        this.statusText = err.statusText 
        this.errName = err.error.name 
        this.errEmail = err.error.email 
        this.errMessage = err.error.message 
        this.errSubject = err.error.subject 
        if (this.errDetail && this.statusText){
          Notiflix.Report.failure(
            this.statusText,
            this.errDetail,
            'Okay',
          )
        }  else if (this.statusText && this.statusText == 'Unknown Error'){
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
