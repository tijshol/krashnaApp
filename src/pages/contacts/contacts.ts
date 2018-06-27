import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { contacts } from '../../assets/json/contacts.js';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {
  contacts: any;
  sort: string;

  constructor(public navCtrl: NavController) {
  	this.contacts = contacts;
  	this.sort = 'name';
  	this.sortMembers();
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

  sortMembers() {
  	this.contacts.members.sort((a,b) => {
  		if (a[this.sort] > b[this.sort])
  			return 1;
  		else if (a[this.sort] < b[this.sort])
  			return -1;
  		else
  			return 0;
  	});
  }
}