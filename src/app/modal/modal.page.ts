import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})

export class ModalPage {

  feedback: string;

  // Data passed in by componentProps
  //@Input() fb: string;
  //@Input() lastName: string;
  //@Input() middleInitial: string;

  constructor(navParams: NavParams) {
    // componentProps can also be accessed at construction time using NavParams
    this.feedback = navParams.get('fb');
    
  }

  ngOnInit () {
    
  }

}
