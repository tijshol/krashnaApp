import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  time = 0;
  constructor(public navCtrl: NavController) {
  	const today = new Date();
  	const tournee = new Date(2018, 7, 6);
  	this.time = Math.floor((tournee.valueOf() -  today.valueOf())/(1000*3600*24));
  }

}
