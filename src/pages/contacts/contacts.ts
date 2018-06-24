import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { contacts } from '../../assets/json/contacts.js';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {
  contacts: object;

  constructor(public navCtrl: NavController) {
  	this.contacts = contacts;
  }

  goHome() {
    this.navCtrl.popToRoot();
  }
}