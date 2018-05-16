import { Component } from '@angular/core';
import { events } from '../../assets/json/events.js';
import { NotificationService } from '../../services/notifications';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  eventList: any[];
  notificationList: any[];

  constructor(private http: HTTP) {
    // Fetch event list (local)
    this.eventList = events;

    const now = new Date();
    let previousItem = {past: true};

    for (let item of this.eventList) {
      const timestamp = new Date(item.date + ' ' + item.time);
      item.timestamp = timestamp;
      item.past = now > timestamp;
      if (previousItem.past && !item.past)
        item.highlight = true;
      previousItem = item;
    }

    // Hide past events
    for (let i = 0; i < this.eventList.length-1; i++) {
      this.eventList[i].hide = this.eventList[i].past && this.eventList[i+1].past; // Leave the last
    }
    this.eventList[this.eventList.length-1].hide = false;

    // // Fetch notifications (currently also local)
    const notificationService = new NotificationService(http);
    this.notificationList = notificationService.get();
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
