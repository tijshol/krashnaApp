import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-challenges',
  templateUrl: 'challenges.html'
})
export class ChallengesPage {

  constructor(public navCtrl: NavController) {
  }

  goHome() {
    this.navCtrl.popToRoot();
  }
}