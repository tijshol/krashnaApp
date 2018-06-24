import { Component } from '@angular/core';
import { events } from '../../assets/json/events.js';
import { NotificationService } from '../../services/notifications';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  schedule: any[];
  notificationList: any[];
  notificationService: NotificationService;
  errMessage: string;
  isLoading: boolean;
  showAllNotifications: boolean;
  showAllSchedule: boolean;
  showAllScheduleButton: boolean;

  constructor(public http: HTTP) {
    // Fetch event list (local)
    this.schedule = [];
    this.notificationList = [];
    this.showAllNotifications = false;
    this.showAllSchedule = false;
    this.showAllScheduleButton = false;
    this.errMessage = '';

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    console.log(now, today);

    const dates = [];
    let previousPast = true;

    for (let event of events) {
      event.timestamp = new Date(event.date + ' ' + event.time);
      event.past = now > event.timestamp;
      event.highlight = !event.past && previousPast;
      if (event.past)
        this.showAllScheduleButton = true;
      previousPast = event.past;
      if (dates.includes(event.date)) {
        this.schedule.find((day) => {
          return day.date == event.date;
        }).events.push(event);
      } else {
        dates.push(event.date);
        const timestamp = new Date(event.date)
        this.schedule.push({
          date: event.date,
          timestamp,
          hide: today > timestamp,
          events: [event],
        });
      }
    }

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

  openEvent(id) {
    for (let day of this.schedule)
      for (let event of day.events)
        event.open = id == event.id ? !event.open : 0;
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

  }
