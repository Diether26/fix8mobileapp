import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }
  
  public isCharAndSpaceOnly(value: any) {
    if (value && value.length > 0) {
      if (/^[a-zA-Z\s]*$/.test(value)) {
          return true;
      } else {
          return false;
      }
    } else {
        return false;
    }
  }

  public isCharAndSpaceOnlyOptional(value: any) {
    if (value && value.length) {
      if (/^[a-zA-Z\s]*$/.test(value)) {
          return true;
      } else {
          return false;
      }
    } else {
        return true;
    }
  }

  public isValidEmail(value: any) {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value && value.length > 0) {
        if (emailPattern.test(value)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
  }

  public isNumOnly (value: any) {
    if (value && value.length > 0) {
      if (/^\d*\.?\d*$/.test(value)) {
          return true;
      } else {
          return false;
      }
    } else {
        return false;
    }
  }

  public isOnValidMaxLength(value: any) {
    if (value && value.length <= 12) {
      return true;
    } else {
        return false;
    }
  }

  public isOnValidMinLength(value: any) {
    if (value && value.length >= 6) {
      return true;
    } else {
        return false;
    }
  }

 
  public isCharOnly(value: any) {
    if (value && value.length > 0) {
      if (/^[a-zA-Z]+$/.test(value)) {
          return true;
      } else {
          return false;
      }
    } else {
        return false;
    }
  }
  
  public HasSpecialChar(value: any) {
    if (value && value.length > 0) {
      if (!(/^[a-zA-Z0-9]+$/.test(value))) {
        return true; 
      } else {
        return false;
      }
    } else {
        return false; 
    }
  }

  public HasExceeded500char(value: any){
    if (value && value.length > 500) {
      return true;
    }else
    {
      return false;
    }
  }

  public IsnotEmpty(value: any){
    if (value && value.length > 0) {
      return true;
    }else
    {
      return false;
    }
  }

  
  public IsValidPhoneNumber(value: any){
    if(value && value.length>0){
      if(/^(09|\+639)\d{9}$/.test(value)){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
}
