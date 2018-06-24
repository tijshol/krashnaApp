import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

import { HomePage } from '../home/home';

import { info } from './info.js';

@Component({
  selector: 'page-cities',
  templateUrl: 'cities.html'
})
export class CitiesPage {
  city: string;
  info: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public launchNavigator: LaunchNavigator) {
  	this.city = this.navParams.get('city');
  	this.info = info[this.city];
    let timestamp;
    if (this.info.concerts)
      for (let concert of this.info.concerts) {
        timestamp = new Date(concert.date + ' ' + concert.time);
        concert.timestamp = timestamp;
      }
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

  mapsLocation(location) {
    this.launchNavigator.navigate(location, {});
  }

  mapsLocationRoute(from, to) {
  	const options: LaunchNavigatorOptions = {
  		start: from,
	};
  	this.launchNavigator.navigate(to, options);
  }
}