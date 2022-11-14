import { Component, OnInit } from '@angular/core';
import { RequestHandlerService } from 'src/app/service/request-handler.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less']
})
export class MessagesComponent implements OnInit {

  constructor(
    public handlerService:RequestHandlerService,
  ) { }

  ngOnInit(): void {
  }

}
