import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AuthAPIService } from 'src/app/services/AuthAPI/auth-api.service';
import { ValidatorsService } from 'src/app/services/validators/validators.service';
import { finalize } from 'rxjs';
import { HomeownerService } from 'src/app/services/homeowner/homeowner.service';
import { AuthJWTService } from 'src/app/services/AuthJWT/auth-jwt.service';

interface LocalFile{
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.page.html',
  styleUrls: ['./profile-update.page.scss'],
})
export class ProfileUpdatePage implements OnInit {
  images: LocalFile[] = [];
  file: any = []; //array
  me:any = {}; //object
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
  url: string ="assets/icon/logo.png";
  loading = false;
  constructor(
    private validatorService: ValidatorsService,
    private toastController: ToastController,
    private authapiService: AuthAPIService,
    private homeOwnerService: HomeownerService,
    private authJWTService: AuthJWTService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getMyDetails();
  }

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
    if (!this.validatorService.isCharAndSpaceOnly(this.me.Firstname)){
      this.fnameisnotValid = true;
      message.push("Firstname is not Valid");
    } else {
      this.fnameisnotValid = false;
    }

    //validation Middlename
    if (!this.validatorService.isCharAndSpaceOnlyOptional(this.me.Middlename)){
      this.mnameisnotValid = true;
    } else {
      this.mnameisnotValid = false;
    }

    //validation Lastname
    if (!this.validatorService.isCharAndSpaceOnly(this.me.Lastname)){
      this.lnameisnotValid = true;
    } else {
      this.lnameisnotValid = false;
    } 

    // validation Email
    if (!this.validatorService.isValidEmail(this.me.Email)){
      this.emailisnotValid = true;
    } else {
      this.emailisnotValid = false;
    }

    //Validation Contact number
    if (!this.validatorService.IsValidPhoneNumber(this.me.ContactNumber)){
      this.numisnotValid = true;
    } else {
      this.numisnotValid = false;
    }

    //Validation Address
    if (this.validatorService.HasExceeded500char(this.me.Address)){
      this.addrsisnotValid = true;
      flag = false;
    } else {
      this.addrsisnotValid = false;
      flag = true;
    }

    if (flag) { 
      let formData = new FormData();
      if (this.file !== null) {
        formData.append("Avatar", this.file);
      }
      formData.append("Firstname", this.me.Firstname);
      formData.append("Middlename", this.me.Middlename);
      formData.append("Lastname", this.me.Lastname);
      formData.append("Email", this.me.Email);
      formData.append("ContactNumber", this.me.ContactNumber);
      formData.append("Birthdate", this.me.Birthdate); 
      formData.append("Sex", this.me.Sex);
      formData.append("Address", this.me.Address);

      this.loading = true;
      this.homeOwnerService.updateHomeowner(formData)
      .pipe(
        finalize(() => {
          //loading part rajud ni
          setTimeout(() => { 
          this.loading = false;
          }, 300);
        })
      ).subscribe(async (response:any) => {
        if(response.flag == true) {
          this.presentToast(response.message)
          await this.authJWTService.refreshToken();
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

  getMyDetails() {
    this.loading = true;
    this.authapiService.me()
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      this.me = response.userData;//dle tanan largo ra response imong ibutang
    },
    (error:any) => {
      this.presentToast(error.message)
    });
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
