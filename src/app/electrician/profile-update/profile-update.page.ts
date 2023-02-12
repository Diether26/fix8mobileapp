import { Component, OnInit } from '@angular/core';
import { ValidatorsService } from 'src/app/services/validators/validators.service';
import { ElectricianService } from 'src/app/services/electrician/electrician.service';
import { ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { finalize } from 'rxjs';
import { AuthAPIService } from 'src/app/services/AuthAPI/auth-api.service';
import { environment } from 'src/environments/environment';
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
  file: any = [];
  resumeFile: any = [];
  certFile: any = [];
  me: any = {};
  fnameisnotValid = false;
  mnameisnotValid = false;
  lnameisnotValid = false;
  emailisnotValid = false;
  numisnotValid = false;
  addrsisnotValid = false;
  fileisnotValid = false;
  expertiesisnotValid = false;
  experienceisnotValid = false;
  url: string ="assets/icon/logo.png";
  loading = false;
  constructor(
    private electricianService: ElectricianService,
    private validatorService: ValidatorsService,
    private toastController: ToastController,
    private authapiService: AuthAPIService,
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
 
  resumeOnchange(ev: any)
  {
     this.resumeFile = ev.target.files[0];
  }
 
  certOnchange(ev: any)
  {
     this.certFile = ev.target.files[0];
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
    if (!this.validatorService.isCharAndSpaceOnly(ev.target.value)){
      this.addrsisnotValid = false;
    } else {
      this.addrsisnotValid = true;
    }
  }
  
  expertiesOnChange(ev: any)
  {
    if (!this.validatorService.HasExceeded500char(ev.target.value)){
      this.expertiesisnotValid = false;
    } else {
      this.expertiesisnotValid = true;
      
    }
  }
 
  experienceOnChange(ev: any)
  {
    if (!this.validatorService.HasExceeded500char(ev.target.value)){
      this.experienceisnotValid = false;
    } else {
      this.experienceisnotValid = true;
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
      flag = false;
    } else {
      this.fnameisnotValid = false;
      flag = true;
    }

    //validation Middlename
    if (!this.validatorService.isCharAndSpaceOnlyOptional(this.me.Middlename)){
      this.mnameisnotValid = true;
      flag = false;
    } else {
      this.mnameisnotValid = false;
      flag = true;
    }

    //validation Lastname
    if (!this.validatorService.isCharAndSpaceOnly(this.me.Lastname)){
      this.lnameisnotValid = true;
      flag = false;
    } else {
      this.lnameisnotValid = false;
      flag = true;
    } 

    // validation Email
    if (!this.validatorService.isValidEmail(this.me.Email)){
      this.emailisnotValid = true;
      flag = false;
    } else {
      this.emailisnotValid = false;
      flag = true;
    }

    //Validation Contact number
    if (!this.validatorService.isNumOnly(this.me.ContactNumber)){
      this.numisnotValid = true;
      flag = false;
    } else {
      this.numisnotValid = false;
      flag = true;
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
      formData.append("Email",this.me.Email);
      formData.append("ContactNumber", this.me.ContactNumber);
      formData.append("Birthdate", this.me.Birthdate); 
      formData.append("Sex", this.me.Sex);
      formData.append("Address", this.me.Address);
      formData.append("Experties", this.me.Experties); 
      formData.append("Experience", this.me.WorkExperience);
      if (this.resumeFile !== null || this.resumeFile.length > 0) {
        formData.append("Resume", this.resumeFile);  
      }
      if (this.certFile !== null || this.certFile.length > 0) {
        formData.append("Certificate", this.certFile);  
      }
      this.loading = true;
      this.electricianService.updateElectrician(formData)
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

 async getMyDetails() {
  this.loading = true;
  this.authapiService.me()
  .pipe(
    finalize(() => {
      this.loading = false;
     //loading part rajud ni
    })
  ).subscribe((response:any) => {
    this.me = response.userData;//dle tanan largo ra response imong ibutang
    this.url = `${environment.avatar_url}${this.me.Avatar}`
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
