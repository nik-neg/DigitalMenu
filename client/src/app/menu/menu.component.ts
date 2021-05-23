import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../menu/entities/menu';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menu: Menu;
  isAdmin: boolean = false
  constructor(private route: ActivatedRoute, private alertController: AlertController) {
    this.menu = new Menu();
   }

  ngOnInit(): void {
    this.getMenuDetails();
  }
  getMenuDetails(): void {
    this.route.queryParams.subscribe(params => {
      this.isAdmin = params['isAdmin'] === 'true' ? true : false;
    });
    // this.alertWrapper();
  }
  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'basic-alert',
  //     header: 'Alert Header',
  //     subHeader: 'Alert Subtitle',
  //     message: 'This is an alert message.',
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }

  editURL() {
    if (this.isAdmin) {
      return `/restaurants/${this.menu.restaurant}/menu/${this.menu._id}`;
    } else {
      // this.alertWrapper();
      return '/';
    }
  }

  // async alertWrapper() {
  //   await this.presentAlert();
  // }

}
