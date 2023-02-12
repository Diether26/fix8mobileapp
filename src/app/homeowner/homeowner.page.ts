import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-homeowner',
  templateUrl: './homeowner.page.html',
  styleUrls: ['./homeowner.page.scss'],
})
export class HomeownerPage implements OnInit {
  constructor(
    private app: AppComponent
  ) { }

  ngOnInit() {
    this.app.reloadUser();
  }

}
