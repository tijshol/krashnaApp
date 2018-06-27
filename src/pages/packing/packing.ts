import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { packingList } from './packingList';

@Component({
  selector: 'page-packing',
  templateUrl: 'packing.html'
})
export class PackingPage {
  packingList: any[];
  checklist: any[];

  constructor(public navCtrl: NavController, public storage: Storage) {
  	this.packingList = packingList;
  	this.checklist = [];
  	storage.get('checklist').then(list => {
      if (list)
  		  this.checklist = list;
  	});
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

  isChecked(i) {
  	return this.checklist[i];
  }

  saveChecklist() {
    this.storage.set('checklist', this.checklist);
  }

}