import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ValidatorsService } from '../services/validators/validators.service';
import { ToastController } from '@ionic/angular';
import { AuthAPIService } from '../services/AuthAPI/auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  passtype = "password";
  @Input() loginData: any = {
    Username: "",
    Password: ""
  }
  usrnmisnotValid = false;
  psswrdisnotValid = false;
  loading = false;
  loadingSubmitReset = false;
  modal = "";
  email = "";
  constructor(
    private validatorService: ValidatorsService,
    private toastController: ToastController,
    private authAPIService: AuthAPIService,
    private router: Router
  ) { }

  ngOnInit() { }
  
  usrnameOnChange(ev: any){
    if (!this.validatorService.IsnotEmpty(ev.target.value)){
      this.usrnmisnotValid = true;
    }else {
      this.usrnmisnotValid = false;
    }
   }

   pssOnchange(ev: any){
    if (!this.validatorService.IsnotEmpty(ev.target.value)){
      this. psswrdisnotValid = true;
    }else {
      this. psswrdisnotValid = false;
    }
   }

  //do login function
  submitForm(ev: any) {
    var flag = false;

    //username Validator
    if (!this.validatorService.IsnotEmpty(ev.target[0].value)){
      this.usrnmisnotValid = true;
      flag = false;
    }else {
      this.usrnmisnotValid = false;
      flag = true;
    }
    //Password Validator
    if (!this.validatorService.IsnotEmpty(ev.target[1].value)){
      this. psswrdisnotValid = true;
      flag = false;
    } else {
      this. psswrdisnotValid = false;
      flag = true;
    }

    if(flag){
      // this.presentToast("Credentials Valid Proceed Login!"); awa ni bro wala ko gagamit ug FormData
      this.loading = true;
      this.authAPIService.loginAccount(this.loginData)
       .pipe(
         finalize(() => {
          //loading part rajud ni
          setTimeout(() => { 
          this.loading = false;
          }, 300);
         })
       ).subscribe((response:any) => {
         if(response.flag == true) {
           this.presentToast(response.message)
           localStorage.setItem("token", response.token)
           this.router.navigate([response.Usertype]);
           //success part
         } else {
           console.log(response.message)
           this.presentToast(response.message)
         }
       },
       (error:any) => {
         this.presentToast(error.message)
       });
    }else{
      this.presentToast("Credentials Invalid can't Login!");
    }
  
  }

  submitResetPass(){
    this.loadingSubmitReset = true;
    let data = {
      email : this.email
    }
    this.authAPIService.resetPassword(data)
    .pipe(
      finalize(() => {
      //loading part rajud ni
      setTimeout(() => { 
      this.loadingSubmitReset = false;
      }, 300);
      })
    ).subscribe((response:any) => {
      if(response.flag == true) {
        this.presentToast(response.message)
        this.initModal('')
        //success part
      } else {
        console.log(response.message)
        this.presentToast(response.message)
      }
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  initModal(modal: any) {
    this.modal = modal;
  }

  async presentToast(msg : string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  togglepass(x:any){
    if(x===1){
      this.showPassword = true;
      this.passtype = "text";
    }else{
      this.showPassword = false;
      this.passtype = "password";
    }
  }
}
