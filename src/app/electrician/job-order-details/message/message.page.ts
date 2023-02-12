import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { AuthJWTService } from 'src/app/services/AuthJWT/auth-jwt.service';
import { MessageService } from 'src/app/services/message/message.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit, OnDestroy {
  @ViewChild("messagesContent",{static:false}) private messagesContent: any;
  Id: any;
  Content: any;
  Messages: any = [];
  last_message_id: any = 0;
  UID: any;
  subscription: Subscription;
  source = interval(1000);
  loading = false;
  constructor(
    private toastController: ToastController,
    private messageService: MessageService,
    private authJWT: AuthJWTService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.Id = localStorage.getItem("selected-job-order");
    this.loading = true;
    this.UID = this.authJWT.getId();
    this.subscription = this.source.subscribe(val => this.getMessages());
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  scrollToBottomOnInit() {
    setTimeout(() => {
      if (this.messagesContent.scrollToBottom) {
          this.messagesContent.scrollToBottom(400);
      }
    }, 500);
  }

  onChange(ev: any) {

  }

  getMessages(){
    this.messageService.getMessages(this.Id, this.last_message_id)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        if (this.loading === true) {
          setTimeout(() => { 
          this.loading = false;
          }, 300);
        }
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        if (this.last_message_id === 0) {
          this.Messages = response.message
          this.scrollToBottomOnInit();
        } else {
          if (response.message.length > 0) {
            this.Messages.push(...response.message);
            this.scrollToBottomOnInit();
          }
        }
        if (this.Messages.length > 0) {
          this.last_message_id = this.Messages.slice(-1)[0].Id;
        }
      } else {
        this.presentToast(response.message)
      }
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  sendMessage() {
    this.messageService.sendMessage(this.Id, this.Content)
    .pipe(
      finalize(() => {
        //loading part rajud ni
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        this.Content = "";
      } else {
        this.presentToast(response.message)
      }
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  selectTextarea() {
    this.scrollToBottomOnInit();
  }

  preventFocusChange(ev: any) {
    ev.preventDefault();
  }

  async presentToast(msg : string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });
  
    await toast.present();
  }
}

