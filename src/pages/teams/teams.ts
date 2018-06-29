import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {
  counter: number;
  isTapping: boolean;

  constructor(public navCtrl: NavController) {
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

  tapMusic() {
  	console.log(this.counter);
  	if (this.isTapping)
  	  this.counter++;
  	else {
  	  this.counter = 0;
  	  this.isTapping = true;
  	  setTimeout(() => {
  	  	this.isTapping = false;
  	  	if (this.counter >= 10) {
  	  	  window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  	  	}
  	  	this.counter = 0;
  	  }, 2000);
  	}
  }
}
