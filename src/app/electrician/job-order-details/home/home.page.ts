import { Component, OnInit,ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { ElectricianService } from 'src/app/services/electrician/electrician.service';
import { environment } from 'src/environments/environment';
import { IonModal } from '@ionic/angular';
import { SwiperOptions } from 'swiper';
import SwiperCore,{Zoom} from 'swiper';
import {SwiperComponent} from 'swiper/angular'
import { ModalController } from "@ionic/angular";
import { ValidatorsService } from 'src/app/services/validators/validators.service';

SwiperCore.use([Zoom])

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('swiper') swiper: SwiperComponent;
  Id: any;
  jobOrder: any = {};
  loading = false;
  loadingCI = false;
  buildingpermit_url: any = environment.buildingpermit_url;
  blueprint_url: any = environment.blueprint_url;
  
  picURL: any="";
  
  config: SwiperOptions ={
    zoom:{
      maxRatio: 3,
      minRatio: 1
    }
  };

  items: any[] = [{
    description: '',
    unit: '',
    type: '',
    qty: 0,
    price: 0,
    amount: 0
  }];

  serviceFee: any = 0;
  dueDate = "1970-01-01T00:00:00+08:00";
  ttl_amount: any = 0;
  paymentMethod: any = '';
  qrCode: any;
  qrCodeFile: any;
  accountNumber: any = '';
  accountHolder: any = '';
  bankName: any = 'GCASH';

  itemSelection: any[]=[];
  
  showbillinginfo = false;

  serviceFeeisnotValid = false;
  itemdescisnoValid =  false;
  itemqtyisnotValid = false;
  itempriceisnotValid = false;

  constructor(
    private toastController: ToastController,
    private electricianService: ElectricianService,
    private modalController: ModalController,
    private validatorService: ValidatorsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.Id = localStorage.getItem("selected-job-order");
    this.getJobOrderDetails();
  }
  
  //Validation
  checkServiceFeeValidity(){
    if(this.serviceFee==="0" || this.serviceFee===null){
      this.serviceFeeisnotValid = false;
    }else if(!this.validatorService.isNumOnly(this.serviceFee)){
      this.serviceFeeisnotValid = true;
    }else{
      this.serviceFeeisnotValid = false;
    }
  }

  checkItemDescValidity(ev:any){
    if(!this.validatorService.IsnotEmpty(ev.target.value)){
      this.itemdescisnoValid = true;
    }else{
      this.itemdescisnoValid = false;
    }
    console.log("checkItemValidity");
  }

  checkItemPriceValidity(ev:any){
    if(ev.target.value===0 || ev.target.value===null){
      this.itempriceisnotValid = false;
    }else if(!this.validatorService.isNumOnly(ev.target.value)){
      this.itempriceisnotValid = true;
    }else{
      this.itempriceisnotValid = false;
    }
  }

  checkItemQtyValidity(ev:any){
    if(ev.target.value===0 || ev.target.value===null){
      this.itemqtyisnotValid = false;
    }else if(!this.validatorService.isNumOnly(ev.target.value)){
      this.itemqtyisnotValid = true;
    }else{
      this.itemqtyisnotValid = false;
    }
  }
  //end for Validations

  zoom(zoomIn:any){
    const zoom = this.swiper.swiperRef.zoom;
    zoomIn ? zoom.in() : zoom.out();
    console.log(zoomIn);
  }

  openmodalblueprint(picString:string){
    this.picURL = this.blueprint_url.concat(picString);
  }

  openmodalpermit(picString:string){
    this.picURL = this.buildingpermit_url.concat(picString);
  }

  cancel() {
    this.modalController.dismiss();
  }

  addItem(){
    this.items.push({
      description: '',
      unit: '',
      type: '',
      qty: 0,
      price:0,
      amount:0
    });
  }

  sumTotalAmount() {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      if (!!this.items[i].amount) {
        total += parseFloat(this.items[i].amount)
      }
    }
    return total + parseFloat(this.serviceFee);
  }

  qrOnChange(ev: any)
  {
      this.qrCodeFile = ev.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(ev.target.files[0]);
      reader.onload=(event:any)=>{
        // this.paymentReceiptFile = event.target.result;
      }
  }

  currentItemSelection(service : string){
    if(service ==="Installation" || service==="Rewiring")
    {
      this.itemSelection = [
        {selectname:'Materials'},
        {selectname:'Hole'},
        {selectname:'Light'},
        {selectname:'Outlet'},
        {selectname:'Circuit Breaker'},
        {selectname:'Service Entrance'},
        {selectname:'Electric Sub-meter'}
      ]
    }else{
      this.itemSelection = [
        {selectname:'Materials'},
        {selectname:'Aircon Installation'},
        {selectname:'Cleaning'},
        {selectname:'Cleaning and Aircon Installation'}
      ]
    }
  }

  removeItem(uId: number) {
    const index = this.items.findIndex((items) => items.id === uId);
    this.items.splice(index, 1);
  }

  changepayment(ev:any){
    console.log(ev.target.value);
    if(ev.target.value==='E-Wallet (GCASH)'){
      this.showbillinginfo=true;
    }else{
      this.showbillinginfo=false;
    }
  }

  // submitInvoice(){
  //  var flag = true;

  // //Submit Validations
  // if(this.service_fee==="0" || this.service_fee===null){
  //   this.serviceFeeisnotValid = false;
  //   flag = true;
  // }else if(!this.validatorService.isNumOnly(this.service_fee)){
  //   this.serviceFeeisnotValid = true;
  //   flag = false;
  // }else{
  //   this.serviceFeeisnotValid = false;
  //   flag = true;
  // }

  // for (let i = 0; i < this.items.length; i++) {
  //     //Qty Validation
  //     if(this.items[i].qty===0 || this.items[i].qty===null){
  //       this.itemqtyisnotValid = false;
  //       flag = true;
  //     }else if(!this.validatorService.isNumOnly(this.items[i].qty)){
  //       this.itemqtyisnotValid = true;
  //       flag = false;
  //     }else{
  //       this.itemqtyisnotValid = false;
  //       flag = true;
  //     }

  //     //Price Validation
  //     if(this.items[i].price===0 || this.items[i].price===null){
  //       this.itemqtyisnotValid = false;
  //       flag = true;
  //     }else if(!this.validatorService.isNumOnly(this.items[i].price)){
  //       this.itemqtyisnotValid = true;
  //       flag = false;
  //     }else{
  //       this.itemqtyisnotValid = false;
  //       flag = true;
  //     }
  // }

  // console.log(flag);

  //  if(flag){
  //   this.presentToast("Goods!")
  //  }else{
  //   this.presentToast("Problem With Validation!")
  //  }
  // }

  accept() {
    this.loading = true;
    this.electricianService.acceptJobOrder(this.Id)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        this.presentToast(response.message)
        this.getJobOrderDetails();
      } else {
        this.presentToast(response.message)
      }
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  reject() {
    this.loading = true;
    this.electricianService.rejectJobOrder(this.Id)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        this.presentToast(response.message)
        this.getJobOrderDetails();
      } else {
        this.presentToast(response.message)
      }
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  inprogress() {
    this.loading = true;
    this.electricianService.inpJobOrder(this.Id)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        this.presentToast(response.message)
        this.getJobOrderDetails();
      } else {
        this.presentToast(response.message)
      }
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  submitInvoice() {
    this.loadingCI = true;
    let formData = new FormData();
    formData.append("id", this.Id);
    formData.append("ServiceFee", this.serviceFee)// required
    formData.append("DueDate", this.dueDate)// required
    formData.append("Items", JSON.stringify(this.items))
    formData.append("PaymentMethod", this.paymentMethod) // required
    formData.append("QrCode", this.qrCodeFile) //required if gcash ang payment method
    formData.append("AccountNumber", this.accountNumber) //required if gcash ang payment method
    formData.append("AccountHolder", this.accountHolder) //required if gcash ang payment method
    formData.append("BankName", this.bankName) //required if gcash ang payment method
    this.electricianService.createInvoice(formData)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loadingCI = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        this.presentToast(response.message)
        this.getJobOrderDetails();
      } else {
        this.presentToast(response.message)
      }
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  getJobOrderDetails() {
    this.loading = true;
    this.electricianService.getJobOrderDetails(this.Id)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        this.jobOrder = response.jobOrder;
        console.log(this.jobOrder)
        this.jobOrder.AppointmentDate = new Date(this.jobOrder.AppointmentDate).toDateString();
        this.currentItemSelection(this.jobOrder.ServiceName);
      } else {
        this.presentToast(response.message)
      }
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
