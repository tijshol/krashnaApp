import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ChallengesPage } from '../pages/challenges/challenges';
import { ContactsPage } from '../pages/contacts/contacts';
import { CitiesPage } from '../pages/cities/cities';
import { PackingPage } from '../pages/packing/packing';
import { TeamsPage } from '../pages/teams/teams';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
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
    TeamsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    TeamsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LaunchNavigator,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
