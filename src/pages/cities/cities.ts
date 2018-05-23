import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-cities',
  templateUrl: 'cities.html'
})
export class CitiesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.city = this.navParams.get('city');
  }

  goHome() {
    this.navCtrl.popToRoot();
  }
}