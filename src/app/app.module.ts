import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ChallengesPage } from '../pages/challenges/challenges';
import { ContactsPage } from '../pages/contacts/contacts';
import { CitiesPage } from '../pages/cities/cities';
import { PackingPage } from '../pages/packing/packing';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from '@ionic-native/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChallengesPage,
    ContactsPage,
    CitiesPage,
    PackingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChallengesPage,
    ContactsPage,
    CitiesPage,
    PackingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
