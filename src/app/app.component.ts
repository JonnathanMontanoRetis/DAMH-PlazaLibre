import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtilService } from './util.service';
import { menuController } from '@ionic/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { CartService } from './services/cart/cart.services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public isMenuEnabled:boolean = true;
  public selectedIndex = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private util: UtilService,
    private router: Router,
    private dataService: DataService,
    private cartService: CartService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.selectedIndex = 1;
    this.util.getMenuState().subscribe(menuState => {
      this.isMenuEnabled = menuState;
    });
    this.changeMessage();
  }

  navigate(path: any, selectedId: number) {
    this.selectedIndex = selectedId;
    this.router.navigate([path], {queryParams: {path: "/home" }});
  }

  changeMessage() {
    this.dataService.updateCantInCart(this.cartService.hasProducts());
  }

  close() {
    menuController.toggle();
  }
}
