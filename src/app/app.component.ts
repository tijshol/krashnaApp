import { ViewChild, Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ChallengesPage } from '../pages/challenges/challenges';
import { CitiesPage } from '../pages/cities/cities';
import { ContactsPage } from '../pages/contacts/contacts';
import { PackingPage } from '../pages/packing/packing';
import { TeamsPage } from '../pages/teams/teams';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mainContent') nav;
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      storage.get('appUnlocked').then((isUnlocked) => {
        if (!isUnlocked)
          this.nav.setRoot(LoginPage);
          this.nav.popToRoot();
      });
    });
  }

  goTo(dest) {
    switch (dest) {
      case 'home':
        this.nav.popToRoot();
      break;
      case 'challenges':
        this.nav.push(ChallengesPage);
      break;
      case 'contacts':
        this.nav.push(ContactsPage);
      break;
      case 'packing':
        this.nav.push(PackingPage);
      break;
      case 'teams':
        this.nav.push(TeamsPage);
      break;
      case 'bratislava':
        this.nav.push(CitiesPage, {city: 'bratislava'});
      break;
      case 'brno':
        this.nav.push(CitiesPage, {city: 'brno'});
      break;
      case 'vienna':
        this.nav.push(CitiesPage, {city: 'vienna'});
      break;
      default: break;
    }
  }
}
