import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { finalize } from 'rxjs';
import { HomeownerService } from '../services/homeowner/homeowner.service';
import { ValidatorsService } from '../services/validators/validators.service';
import { ToastController } from '@ionic/angular';

interface LocalFile{
  name: string;
  path: string;
  data: string;
}
 
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  images: LocalFile[] = [];
  file: any = [];
  fnameisnotValid = false;
  mnameisnotValid = false;
  lnameisnotValid = false;
  emailisnotValid = false;
  numisnotValid = false;
  addrsisnotValid = false;
  usrnmisnotValid = false;
  psswrdisnotValid = false;
  cfmpsswrdisnotValid = false;
  fileisnotValid = false;

  showPassword = false;
  passtype = "password";
  conshowPassword = false;
  conpasstype = "password";

  url: string ="assets/icon/logo.png";
  userInput: any = {
    Firstname: "",
    Middlename: "",
    Lastname: "",
    Email: "",
    ContactNumber: "",
    Birthdate: "",
    Gender: "",
    Address: "",
    Username: "",
    Password: "",
    ConfirmPassword: ""
  }
  loading = false;
  constructor( 
    private platform: Platform, 
    private loadingCtrl: LoadingController,
    private homeOwnerService: HomeownerService,
    private validatorService: ValidatorsService,
    private toastController: ToastController
  ) 
  { }

  ngOnInit() {}

  profilepicOnchange(ev: any)
 {
    this.file = ev.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload=(event:any)=>{
      this.url = event.target.result;
    }
    console.log(this.file);
 }

// Validation Onchange
 fnOnChange(ev: any)
 {
    if (!this.validatorService.isCharAndSpaceOnly(ev.target.value)){
      this.fnameisnotValid = true;
    } else {
      this.fnameisnotValid = false;
    }
 }

 mnOnChange(ev:any)
 {
  if (!this.validatorService.isCharAndSpaceOnlyOptional(ev.target.value)){
    this.mnameisnotValid = true;
  } else {
    this.mnameisnotValid = false;
  }
 }

 lnOnChange(ev:any){
  if (!this.validatorService.isCharAndSpaceOnly(ev.target.value)){
    this.lnameisnotValid = true;
  } else {
    this.lnameisnotValid = false;
  }
 }

 emlOnChange(ev:any){
  if (!this.validatorService.isValidEmail(ev.target.value)){
    this.emailisnotValid = true;
  } else {
    this.emailisnotValid = false;
  }
 }

 noOnChange(ev: any){
  if(!this.validatorService.IsValidPhoneNumber(ev.target.value)){
    this.numisnotValid = true;
  }
   else {
    this.numisnotValid = false;
  }
 }

 addrsOnChange(ev: any){
  if (!this.validatorService.HasExceeded500char(ev.target.value)){
    this.addrsisnotValid = false;
  } else {
    this.addrsisnotValid = true;
  }
 }

 usrnameOnChange(ev: any){
  if (!this.validatorService.isOnValidMinLength(ev.target.value)){
    this.usrnmisnotValid = true;
  }else if(!this.validatorService.isOnValidMaxLength(ev.target.value)){
    this.usrnmisnotValid = true;
  } else {
    this.usrnmisnotValid = false;
  }
 }

 pssOnchange(ev: any){
  if (!this.validatorService.isOnValidMinLength(ev.target.value)){
    this. psswrdisnotValid = true;
  }else if(!this.validatorService.isOnValidMaxLength(ev.target.value)){
    this. psswrdisnotValid = true;
  } else {
    this. psswrdisnotValid = false;
  }
 }


 //SUBMIT DATA
  submitForm(ev: any) {
    let flag = true;
    let message = [];

    //validation Firstname
    if (!this.validatorService.isCharAndSpaceOnly(this.userInput.Firstname)){
      this.fnameisnotValid = true;
      message.push("Firstname is not Valid");
      flag = false;
    } else {
      this.fnameisnotValid = false;
      flag = true;
    }

    //validation Middlename
    if (!this.validatorService.isCharAndSpaceOnlyOptional(this.userInput.Middlename)){
      this.mnameisnotValid = true;
      flag = false;
    } else {
      this.mnameisnotValid = false;
      flag = true;
    }

    //validation Lastname
    if (!this.validatorService.isCharAndSpaceOnly(this.userInput.Lastname)){
      this.lnameisnotValid = true;
      flag = false;
    } else {
      this.lnameisnotValid = false;
      flag = true;
    } 

    // validation Email
    if (!this.validatorService.isValidEmail(this.userInput.Email)){
      this.emailisnotValid = true;
      flag = false;
    } else {
      this.emailisnotValid = false;
      flag = true;
    }

    //password matching
    if(this.userInput.Password === this.userInput.ConfirmPassword){
      this.cfmpsswrdisnotValid = false;
      flag = true;
    }else{
      flag = false;
      this.cfmpsswrdisnotValid = true;
    }
    //Validation Contact number
    if(!this.validatorService.IsValidPhoneNumber(this.userInput.ContactNumber)){
      this.numisnotValid = true;
      flag = false;
    }
     else {
      this.numisnotValid = false;
      flag = true;
    }

    //Validation for address
    if (!this.validatorService.HasExceeded500char(this.userInput.Address)){
      this.addrsisnotValid = false;
      flag = true;
    } else {
      this.addrsisnotValid = true;
      flag = false;
    }
    //Validation for username
    if (!this.validatorService.isOnValidMinLength(this.userInput.Username)){
      this.usrnmisnotValid = true;
      flag = false;
    }else if(!this.validatorService.isOnValidMaxLength(this.userInput.Username)){
      this.usrnmisnotValid = true;
      flag = false;
    } else {
      this.usrnmisnotValid = false;
      flag = true;
    }
     //Validation for password
    if (!this.validatorService.isOnValidMinLength(this.userInput.Password)){
      this. psswrdisnotValid = true;
      flag = false;
    }else if(!this.validatorService.isOnValidMaxLength(this.userInput.Password)){
      this. psswrdisnotValid = true;
      flag = false;
    } else {
      this. psswrdisnotValid = false;
      flag = true;
    }

    if (flag) { 
      this.loading = true;
      let formData = new FormData();
      formData.append("Avatar", this.file);
      formData.append("Firstname", this.userInput.Firstname);
      formData.append("Middlename", this.userInput.Middlename);
      formData.append("Lastname", this.userInput.Lastname);
      formData.append("Email", this.userInput.Email);
      formData.append("ContactNumber", this.userInput.ContactNumber);
      formData.append("Birthdate", this.userInput.Birthdate); 
      formData.append("Sex", this.userInput.Gender);
      formData.append("Address", this.userInput.Address);
      formData.append("Username", this.userInput.Username);
      formData.append("Password", this.userInput.Password);

      this.homeOwnerService.registerHomeOwner(formData)
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
          //success part
          //reset FORM
          this.resetForm(ev);
         
        } else {
          console.log(response.message)
          this.presentToast(response.message)
        }
      },
      (error:any) => {
        console.log(error)
        this.presentToast(error.message)
      });
    } else {
      console.log(message);
    }    
  }

  resetForm(ev: any) {
    ev.target[0].value='';
    ev.target[1].value='';
    ev.target[2].value='';
    ev.target[3].value='';
    ev.target[4].value='';
    ev.target[5].value='';
    ev.target[6].value=''; 
    ev.target[7].value='';
    ev.target[8].value='';
    ev.target[9].value='';
    ev.target[10].value='';
    ev.target[11].value='';
    this.url ="assets/icon/logo.png";
  }

  async presentToast(msg : string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  toggleconpass(x:any){
    if(x===1){
      this.conshowPassword = true;
      this.conpasstype = "text";
    }else{
      this.conshowPassword = false;
      this.conpasstype = "password";
    }
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
