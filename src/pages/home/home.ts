import { Component } from '@angular/core';
import { events } from '../../assets/json/events.js';
import { NotificationService } from '../../services/notifications';
import { HTTP } from '@ionic-native/http';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

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
  showAllNotifications: boolean;

  constructor(public http: HTTP, public launchNavigator: LaunchNavigator) {
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

    this.dateTransitions.push(this.eventList.length);

    // Hide past events
    for (let i = 0; i < this.eventList.length-1; i++) {
      this.eventList[i].hide = this.eventList[i].past && this.eventList[i+1].past; // Leave the last
    }
    this.eventList[this.eventList.length-1].hide = false; // There should always be 1 (past) event

    this.notificationService = new NotificationService(this.http);

    // Fetch notifications (works only on device)
    this.isLoading = true;
    this.fetchNotifications().then(() => { this.isLoading = false; });
  }

  fetchNotifications() {
    return this.notificationService.get().then(d => {
          this.errMessage = '';
          this.notificationList = [];
          const values = JSON.parse(d.data).values;
          const fields = values[0];
          for (let i = 1; i < values.length; i++) {
            const n = {open: false};
            for (let j = 0; j < fields.length; j++) {
              n[fields[j]] = values[i][j];
            }
            this.notificationList.push(n);
          }
        })
        .catch(e => {
          if (typeof(e) === 'object' && e.error !== undefined)
            this.errMessage = e.error.message;
          else if (typeof(e) === 'string')
            this.errMessage = e;
          else
            this.errMessage = 'unknown error';
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

  openNotification(i) {
    for (let j = 0; j < this.notificationList.length; j++) {
        this.notificationList[j].open = i == j ? !this.notificationList[j].open : 0;
      }
	}

  doRefresh(refresher) {
    this.fetchNotifications().then(() => {
      refresher.complete();
    });
  }

  mapsLocation(location) {
    this.launchNavigator.navigate(location, {});
  }

  }
