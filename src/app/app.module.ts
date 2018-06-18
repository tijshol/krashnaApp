import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ChallengesPage } from '../pages/challenges/challenges';
import { ContactsPage } from '../pages/contacts/contacts';
import { CitiesPage } from '../pages/cities/cities';
import { PackingPage } from '../pages/packing/packing';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from '@ionic-native/http';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChallengesPage,
    ContactsPage,
    CitiesPage,
    PackingPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChallengesPage,
    ContactsPage,
    CitiesPage,
    PackingPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    LaunchNavigator,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
