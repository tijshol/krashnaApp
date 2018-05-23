import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { challenges } from '../../assets/json/challenges.js';

@Component({
  selector: 'page-challenges',
  templateUrl: 'challenges.html'
})
export class ChallengesPage {

  constructor(public navCtrl: NavController) {
  	this.challenges = challenges;
  }

  goHome() {
    this.navCtrl.popToRoot();
  }
}