import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-electrician',
  templateUrl: './electrician.page.html',
  styleUrls: ['./electrician.page.scss'],
})
export class ElectricianPage implements OnInit {
  constructor(
    private app: AppComponent
  ) { }

  ngOnInit() {
    this.app.reloadUser();
  }

}
