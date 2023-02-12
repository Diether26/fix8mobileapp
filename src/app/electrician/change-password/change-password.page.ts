import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ValidatorsService } from 'src/app/services/validators/validators.service';
import { finalize } from 'rxjs';
import { ElectricianService } from 'src/app/services/electrician/electrician.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  currentPasstype = "password";
  showCurrentPass = false;

  newPasstype = "password";
  showNewPass = false;
  newPassisnotValid = false;

  confirmPasstype = "password";
  showConfirmPass = false;
  confirmpassnotValid = false;

  passwordForm = {
    OldPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
    loading: false
  }


  constructor(
    private validatorService : ValidatorsService,
    private toastController : ToastController,
    private electricianService : ElectricianService
  ) { }

  ngOnInit() {
  }
  newpassOnchange(){
    if (!this.validatorService.isOnValidMinLength(this.passwordForm.NewPassword)){
      this.newPassisnotValid = true;
    }else if(!this.validatorService.isOnValidMaxLength(this.passwordForm.NewPassword)){
      this.newPassisnotValid = true;
    } else {
      this.newPassisnotValid = false;
    }
  }

  confirmpassOnchange(){
    if(this.passwordForm.NewPassword === this.passwordForm.ConfirmPassword)
    {
      this.confirmpassnotValid = false;
    }else{
      this.confirmpassnotValid = true;
    }
  }
  submitForm(){
    let flag = true;
    //New Password Validation
    if (!this.validatorService.isOnValidMinLength(this.passwordForm.NewPassword)){
      this.newPassisnotValid = true;
      flag = false;
    }else if(!this.validatorService.isOnValidMaxLength(this.passwordForm.NewPassword)){
      this.newPassisnotValid = true;
      flag = false;
    } else {
      this.newPassisnotValid = false;
      flag = true;
    }

    //Confirm Password Validation
    if(this.passwordForm.NewPassword === this.passwordForm.ConfirmPassword)
    {
      this.confirmpassnotValid = false;
      flag = true;
    }else{
      this.confirmpassnotValid = true;
      flag = false;
    }
    
    if(flag){
      this.passwordForm.loading = true;
      this.electricianService.updatePassword(this.passwordForm.OldPassword,this.passwordForm.NewPassword,this.passwordForm.ConfirmPassword)
      .pipe(
        finalize(() => {
          //loading part rajud ni
          setTimeout(() => { 
            this.passwordForm.loading = false;
          }, 300);
        })
      ).subscribe((response:any) => {
        if(response.flag == true) {
          this.presentToast(response.message)
          //reset FORM
         
        } else {
          console.log(response.message)
          this.presentToast(response.message)
        }
      },
      (error:any) => {
        console.log(error)
        this.presentToast(error.message)
      });
    }else{
      this.presentToast("Validation Error!")
    }

  }

  toggleCurrentPass(x:any){
    if(x===1){
      this.showCurrentPass = true;
      this.currentPasstype = "text";
    }else{
      this.showCurrentPass = false;
      this.currentPasstype = "password";
    }
  }

  toggleNewPass(x:any){
    if(x===1){
      this.showNewPass = true;
      this.newPasstype = "text";
    }else{
      this.showNewPass = false;
      this.newPasstype = "password";
    }
  }

  toggleConfirmPass(x:any){
    if(x===1){
      this.showConfirmPass = true;
      this.confirmPasstype = "text";
    }else{
      this.showConfirmPass = false;
      this.confirmPasstype = "password";
    }
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
