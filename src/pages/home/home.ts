import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  eventList: any[];
  notificationList: any[];

  constructor(private http: Http) {
    // Fetch event list (local)
  	let localData = http.get('../../assets/json/events-test.json').map(res => res.json().events);
    localData.subscribe(data => {
      this.eventList = data;

      const now = new Date();
      let previousItem = {};

      for (let item of this.eventList) {
        const timestamp = new Date(item.date + ' ' + item.time);
        item.past = now > timestamp;
        if (previousItem.past && !item.past)
          item.highlight = true;
        previousItem = item;
      }

      // Splice past events
      for (let i = 0; i < this.eventList.length; i++) {
        //if (this.eventList[i].past) this.eventList.splice(i,1); // Splice all
        if (this.eventList[i].past && this.eventList[i+1].past) this.eventList.splice(i,1); // Leave the last
      }
    })

    // Fetch notifications (currently also local)
    let localData = http.get('../../assets/json/notifications-test.json').map(res => res.json().notifications);
    localData.subscribe(data => {
      this.notificationList = data;
    })
  }

  openEvent(i) {
    for (let j = 0; j < this.eventList.length; j++) {
        this.eventList[j].open = i == j ? !this.eventList[j].open : 0;
      }
	}
  deleteNotification(i) {
    this.notificationList.splice(i,1);
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  }
