import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { appPassword } from '../../services/keys/password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  password: string;
  passIsWrong: boolean;
  passIsRight: boolean;

  constructor(public navCtrl: NavController, public storage: Storage) {
    this.passIsWrong = false;
    this.passIsRight = false;
  }

  unlock() {
  	if (this.password === appPassword) {
      this.passIsWrong = false;
      this.passIsRight = true;
  		this.storage.set('appUnlocked', true);
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
  	}
  	else {
      this.password = '';
      this.passIsWrong = true;
    }
  }
}
