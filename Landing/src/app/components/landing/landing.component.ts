import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import * as Notiflix from 'notiflix';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent implements OnInit {
  editor:any = Editor;
  html: any = '';
  


  constructor(
    private service:ContactService,
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
  }
  contact(contactData: any){
    Notiflix.Loading.pulse('Sending message... please wait.')
    // this.service.sendMessage(contactData).subscribe({
    //   next: (data) => {
    //     Notiflix.Loading.remove()
    //     Notiflix.Report.success(
    //       'Message sent!',
    //       'Your message was delivered successfully! We will get back to you soonest possible.',
    //       'Okay',
    //     )
    //   }, 
    //   error: (err) => {
    //     Notiflix.Loading.remove()
    //     Notiflix.Report.failure(
    //       'Sorry!',
    //       'Something went wrong as we tried to send your message.',
    //       'Okay',
    //     )
    //   }
    // })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
