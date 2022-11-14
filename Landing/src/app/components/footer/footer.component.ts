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
  show: boolean = true;
  contactForm: any;

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
        const form = (<HTMLFormElement>document.getElementById('expansion'))
        form.reset();
        this.recaptchaV3Service.execute('recaptcha').subscribe(
          (token) => {
            console.warn("recaptcha token:",token)
          } 
        );
      }
    })
  }
  

}
