import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-sucess',
  templateUrl: './order-sucess.component.html',
  styleUrls: ['./order-sucess.component.scss']
})
export class OrderSucessComponent {

  message = {
    'icon': 'fas fa-thumbs-up',
    'status': 'SUCCESS !',
    'body': 'Congratulations you successfully completed your order',
    'footer': 'Thank you',
  };

  constructor() { }

}
