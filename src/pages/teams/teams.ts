import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {

  constructor(public navCtrl: NavController) {
  }

  goHome() {
    this.navCtrl.popToRoot();
  }
}