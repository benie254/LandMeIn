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
  order(){
    Notiflix.Confirm.show(
      'Confirm purchase',
      "Are you sure you want to place this order?",
      "I'm sure",
      "Take me back",
      () => {
        Notiflix.Report.success(
          "Success!",
          "Your order was placed successfully. We will email you more instructions and share a progress report as soon as we get things going. Hang tight.",
          "Thanks",
        )
      },
      () => {
        Notiflix.Report.success(
          "Aborted!",
          "Your order placement was aborted successfully. If you didn't mean to cancel, you can always place a new order.",
          'Great',
        )
      }
    )
  }
  book(){
    Notiflix.Confirm.show(
      'Confirm booking',
      "Are you sure you want to book this order?",
      "I'm sure",
      "Take me back",
      () => {
        Notiflix.Report.success(
          "Success!",
          "You successfully booked a copy of this package. We will email you more instructions as soon as we get things going. Hang tight.",
          "Thanks",
        )
      },
      () => {
        Notiflix.Report.success(
          "Aborted!",
          "Your booking was aborted successfully. If you didn't mean to cancel, you can always make a new booking.",
          'Great',
        )
      }
    )
  }
  preview(){
    Notiflix.Report.info(
      'Package preview',
      "Thank you for your interest in this product. We are still working on generating package previews for all our products. Hang on tight and check back with us in a few weeks!",
      'Sure!'
    )
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
