import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { events } from '../../assets/json/events.js';
import { NotificationService } from '../../services/notifications';

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
  thankYou: boolean;
  showAllNotifications: boolean;
  showAllSchedule: boolean;
  showAllScheduleButton: boolean;

  constructor(public http: HttpClient) {
    // Fetch event list (local)
    this.schedule = [];
    this.notificationList = [];
    this.showAllNotifications = false;
    this.showAllSchedule = false;
    this.showAllScheduleButton = false;
    this.thankYou = false;
    this.errMessage = '';

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let dates: string[] = [];
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

    if (this.schedule.find((day) => { return !day.hide }) === undefined) { this.thankYou = true; }

    this.notificationService = new NotificationService(this.http);

    // Fetch notifications (works only on device)
    this.fetchNotifications();
  }

  fetchNotifications(refreshEvent = undefined) {
    if (refreshEvent === undefined) this.isLoading = true;
    const onComplete = () => { 
        refreshEvent === undefined ? this.isLoading = false : refreshEvent.complete()
      };
    this.errMessage = '';
    return this.notificationService.get().subscribe(d => {
          this.notificationList = [];
          const values = d.values;
          const fields = values[0];
          for (let i = 1; i < values.length; i++) {
            const n = {open: false};
            for (let j = 0; j < fields.length; j++) {
              n[fields[j]] = values[i][j];
            }
            this.notificationList.push(n);
          }
        }, e => {
          onComplete();
          if (typeof(e) === 'object' && e.message !== undefined)
            this.errMessage = e.message;
          else
            this.errMessage = 'unknown error';
      }, onComplete);
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
    this.fetchNotifications(refresher);
  }

  }
