import { Component, OnInit } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import	{	Platform	}	from	'@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  show = false;
  on = false;
  constructor(
    private flashlight: Flashlight,
    private platform: Platform
  ) {
    if ((this.platform.is('mobile')) || (this.platform.is('tablet'))) {
      this.show = true;
    }
    this.platform.pause.subscribe(() => {
      if (this.flashlight.isSwitchedOn) {
        this.flashlight.switchOff();
      }
    });
  }


 async isAvailable(): Promise<boolean> {
    return await this.flashlight.available();
  }
  ngOnInit() {}

  async flash() {
    this.show = await this.isAvailable();
    if (this.show) {
      this.flashlight.toggle();
    } else {
      console.log('no flash');
    }
  }
}
