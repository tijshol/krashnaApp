import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { challenges } from '../../assets/json/challenges.js';

@Component({
  selector: 'page-challenges',
  templateUrl: 'challenges.html'
})
export class ChallengesPage {
  challenges: any[];

  constructor(public navCtrl: NavController) {
  	this.challenges = challenges;
  }

  goHome() {
    this.navCtrl.popToRoot();
  }
}