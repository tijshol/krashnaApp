import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';

import { packingList } from './packingList';

@Component({
  selector: 'page-packing',
  templateUrl: 'packing.html'
})
export class PackingPage {

  constructor(public navCtrl: NavController, storage: Storage) {
  	this.packingList = packingList;
  	this.checklist = [];
  	storage.get('checklist').then(list => {
  		this.checklist = list;
  	});
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

  isChecked(id) {
  	return this.checklist.includes(id);
  }

  check(id) {
  	if (!this.isChecked(id))
  	  this.checklist.push(id);
  }

}