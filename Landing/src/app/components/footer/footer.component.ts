import { Component, OnInit } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
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

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
  ) { }

  public recaptcha(): void {
    this.recaptchaV3Service.execute('recaptcha').subscribe(
      (token) => {
        console.warn("recaptcha token:",token)
      } 
    );
  }

  ngOnInit(): void {
  }
  

}
