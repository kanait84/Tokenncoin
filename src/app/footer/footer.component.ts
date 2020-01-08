import { Component, OnInit } from '@angular/core';
import {ApiservicesService} from '../apiservices.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  emailTyped = '';
  alreadyExist = false;
  blankCheck = false;
  isNotValid = false;
  isSuccess = false;
  comingsoonShow;
  popuptext;
  constructor( public apiServices: ApiservicesService) { }

  ngOnInit() {
  }
  comingSoon(value) {
    this.comingsoonShow = true;
    this.popuptext = value;
  }
  closepop() {
    this.comingsoonShow = false;
  }

  subscribe() {
    this.alreadyExist = false;
    this.blankCheck = false;
    this.isNotValid = false;
    this.isSuccess = false;
    if (this.emailTyped !== '') {
      this.apiServices.subscriptionAdding(this.emailTyped).subscribe( (res) => {
        this.isSuccess = true;
      }, (err) => {
        if (err.status === 406) {
          this.isNotValid = true;
        } else {
          this.alreadyExist = true;
        }
      });
    } else {
      this.blankCheck = true;
    }

  }
  setNull() {
    this.alreadyExist = false;
    this.blankCheck = false;
    this.isNotValid = false;
    this.isSuccess = false;
  }
}
