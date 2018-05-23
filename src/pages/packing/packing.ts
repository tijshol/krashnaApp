import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-packing',
  templateUrl: 'packing.html'
})
export class PackingPage {

  constructor(public navCtrl: NavController) {
  }

  goHome() {
    this.navCtrl.popToRoot();
  }
}