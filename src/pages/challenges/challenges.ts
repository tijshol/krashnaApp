import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { challenges } from '../../assets/json/challenges.js';

@Component({
  selector: 'page-challenges',
  templateUrl: 'challenges.html'
})
export class ChallengesPage {
  challenges: any[];
  checklist: any[];

  constructor(public navCtrl: NavController, public storage: Storage) {
  	this.challenges = challenges;
  	this.checklist = [];
  	storage.get('challenges').then(list => {
      if (list)
  		this.checklist = list;
  	});
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

  isChecked(id) {
  	return this.checklist[id];
  }

  toggleCheck(id) {
  	this.checklist[id] = !this.checklist[id];
    this.storage.set('challenges', this.checklist);
  }
}