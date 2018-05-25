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
  dateTransitions: any[];
  errMessage: string;
  isLoading: boolean;

  constructor(public http: HTTP) {
    // Fetch event list (local)
    this.eventList = events;
    this.dateTransitions = [];
    this.notificationList = [];
    this.errMessage = '';

    const now = new Date();
    let previousItem = {past: true, timestamp: new Date(0)};

    for (let item of this.eventList) {
      const timestamp = new Date(item.date + ' ' + item.time);
      item.timestamp = timestamp;
      item.past = now > timestamp;
      if (previousItem.past && !item.past)
        item.highlight = true;

      if (!(previousItem.timestamp.getFullYear() === item.timestamp.getFullYear()
         && previousItem.timestamp.getMonth() === item.timestamp.getMonth()
         && previousItem.timestamp.getDate() === item.timestamp.getDate()))
        this.dateTransitions.push(item.id);

      previousItem = item;
    }

    // Hide past events
    for (let i = 0; i < this.eventList.length-1; i++) {
      this.eventList[i].hide = this.eventList[i].past && this.eventList[i+1].past; // Leave the last
    }
    this.eventList[this.eventList.length-1].hide = false;

    this.notificationService = new NotificationService(this.http);

    // Fetch notifications (works only on device)
    this.isLoading = true;
    this.fetchNotifications();
  }

  fetchNotifications() {
    return this.notificationService.get().then(d => {
          this.errMessage = '';
          this.notificationList = [];
          const values = JSON.parse(d.data).values;
          const fields = values[0];
          for (let i = 1; i < values.length; i++) {
            const n = {};
            for (let j = 0; j < fields.length; j++) {
              n[fields[j]] = values[i][j];
            }
            this.notificationList.push(n);
          }
          this.isLoading = false;
        })
        .catch(e => {
          if (typeof(e) === 'object' && e.error !== undefined)
            this.errMessage = e.error.message;
          else if (typeof(e) === 'string')
            this.errMessage = e;
          else
            this.errMessage = 'unknown error';
          this.isLoading = false;
      });
  }

  isDateTransition(i) {
    return this.dateTransitions.includes(i)
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
    this.fetchNotifications().then(() => {
      refresher.complete();
    });
  }

  }
