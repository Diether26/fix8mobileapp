import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeownerService } from 'src/app/services/homeowner/homeowner.service';
import { finalize } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ValidatorsService } from 'src/app/services/validators/validators.service';
import { AuthAPIService } from 'src/app/services/AuthAPI/auth-api.service';
import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-electrician-details',
  templateUrl: './electrician-details.page.html',
  styleUrls: ['./electrician-details.page.scss'],
})
export class ElectricianDetailsPage implements OnInit {
  Id: any;
  elecDetails:any={};
  feedbackSummary: any={};
  feedback:any=[];
  bluePrint: any = [];
  buildingPermit: any = [];
  avatar_url: any = environment.avatar_url
  certificate_url: any = environment.certificate_url
  resume_url: any = environment.resume_url
  isInstallation = false;
  numisnotValid = false;
  locationisnotValid = false;
  descisnotValid = false;;
  JobOrder: any = {
    Service: "",
    JobType: "",
    Description: "",
    PhoneNumber: "",
    Location: "",
    AppointmentDate: "1970-01-01T00:00:00+08:00"
  }
  loading = false;
  loadingCreate = false;
  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private validatorService: ValidatorsService,
    private homeownerService: HomeownerService,
    private authapiService: AuthAPIService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.Id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getElectricianDetails(this.Id);
    this.getMyDetails();
  }


  serviceOnSelect(ev: any)
  {
     if(ev.target.value==="Installation"){
      console.log(ev.target.value);
      this.isInstallation = true;
     }else{
      this.isInstallation = false;
      this.bluePrint = [];
      this.buildingPermit = [];
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

  blueprintOnchange(ev: any){
    this.bluePrint = ev.target.files[0];
  }

  buildingPermitOnchange(ev: any){
    this.buildingPermit = ev.target.files[0];
  }
  
  LocationOnchange(ev: any){
    if (this.validatorService.HasExceeded500char(ev.target.value)){
      this.locationisnotValid = true;
    } else {
      this.locationisnotValid = false;
    }
    console.log(this.locationisnotValid);
  }

  descOnChange(ev: any)
  {
    if (this.validatorService.HasExceeded500char(ev.target.value)){
      this.descisnotValid = true;
    } else {
      this.descisnotValid = false;
    }
  }

  submitForm(ev: any) {
    let flag = true;
    let message = [];
    // //PhoneNumber Validation
    // if(!this.validatorService.IsValidPhoneNumber(this.JobOrder.PhoneNumber)){
    //   this.numisnotValid = true;
    //   flag = false;
    // }
    //  else {
    //   this.numisnotValid = false;
    //   flag = true;
    // }

    // //Location Validation
    // if (!this.validatorService.HasExceeded500char(this.JobOrder.Location)){
    //   this.locisnotValid  = false;
    //   flag = true;
    // } else {
    //   this.locisnotValid  = true;
    //   flag = false;
    // }

    // //Description Validation
    // if (!this.validatorService.HasExceeded500char(this.JobOrder.Description)){
    //   this.descisnotValid = false;
    //   flag = true;
    //   } else {
    //   this.descisnotValid= true;
    //   flag = false;
    // }

    if(flag){
      let formData = new FormData();
      formData.append("ServiceName", this.JobOrder.Service);
      formData.append("JobType", this.JobOrder.JobType);
      formData.append("Description", this.JobOrder.Description);
      formData.append("ContactNumber", this.JobOrder.PhoneNumber);
      formData.append("Location", this.JobOrder.Location);
      formData.append("AppointmentDate", this.JobOrder.AppointmentDate);
      formData.append("RequestedTo", this.Id);
      if (this.bluePrint !== null || this.bluePrint.length > 0) {
        formData.append("Blueprint", this.bluePrint);
      }
      if (this.buildingPermit !== null || this.buildingPermit.length > 0) {
        formData.append("BuildingPermit", this.buildingPermit);
      }

      this.loadingCreate = true;
      this.homeownerService.createJobOrder(formData)
      .pipe(
        finalize(() => {
          //loading part rajud ni
          setTimeout(() => { 
          this.loadingCreate = false;
          }, 300);
        })
      ).subscribe((response:any) => {
        if(response.flag == true) {
          this.presentToast(response.message)
          this.resetForm();
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
      console.log("Validation Error");
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
      this.JobOrder.Location = response.userData.Address;
      this.JobOrder.PhoneNumber = response.userData.ContactNumber;
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  getElectricianDetails(id:any){
    this.loading = true;
    this.homeownerService.getElectricianDetails(id)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      this.elecDetails = response.userdata;
      this.elecDetails.Birthdate = new Date(this.elecDetails.Birthdate).toDateString();

      this.feedbackSummary = response.feedback_summary;
      this.feedback = response.feedback;
      console.log(response);
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

resetForm() { 
  this.JobOrder = {
    Service: "",
    JobType: "",
    Description: "",
    AppointmentDate: "1970-01-01T00:00:00+08:00"
  }
}

downloadCertificate(document:string){
  this.loading = true;
  let certURL = this.certificate_url.concat(document);
  Browser.open({ url: certURL});
  this.loading = false;
}

downloadResume(document:string){
  this.loading = true;
  let resumeURL = this.resume_url.concat(document);
  Browser.open({ url: resumeURL});
  this.loading = false;
}

}
