import {Component, Injectable, OnInit, Inject, PLATFORM_ID, Optional} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiservicesService} from '../apiservices.service';
import { TranslateService } from '@ngx-translate/core';
import { OverviewComponent} from '../overview/overview.component';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { isPlatformBrowser } from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    {provide: LOCAL_STORAGE, useValue: {}}
  ]
})
export class HeaderComponent implements OnInit {
  currencies: any;
  constructor(  @Inject(PLATFORM_ID) private platformId: object, private activeRoute: ActivatedRoute ,
                private apiServices: ApiservicesService , @Optional()
                private router: Router ,
                public ovm: OverviewComponent,
                private translate: TranslateService) {translate.setDefaultLang('en'); }
  globalData: any;
  menu = false ;
  translateOptions = {'ENG': 'en',  'KOR': 'kor', 'RUS': 'rus' , 'POR': 'por' ,'JAP': 'ja', 'CHI': 'ch' /*'JAP': 'jap', 'CHI': 'chi',*/};
  currentTranslated = 'ENG';
  fcurrency = 'usd';
  fcurrencyValue = 1 ;
  mode = '';
  message: string;
  bankCtrl: any;
  bankFilterCtrl: any;
  currencyPopup = false;
  validCurrencies = ['AED' , 'USD', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS',
    'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR'];
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('lang-g') !== null) {
        this.translate.use(localStorage.getItem('lang-g-g'));
        this.currentTranslated = localStorage.getItem('lang-g');
        localStorage.setItem('mode', this.mode);
      }
      if (localStorage.getItem('mode') == null) {
        this.mode = 'dark';
        localStorage.setItem('mode', this.mode);
      } else {
        this.mode = localStorage.getItem('mode');
      }
      this.synchData();
      this.apiServices.currentMessage.subscribe(message => this.message = message);
      this.apiServices.changeMessage(this.mode);
    }
    this.apiServices.getCurrencies().subscribe(res => {
      // @ts-ignore
      this.currencies = res;
    });
  }
  onCurrency(cur , cvalue) {
    this.fcurrency = cur;
    this.fcurrencyValue = cvalue;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('localCurrencyFormat', cur);
      localStorage.setItem('localCurrencyValue', cvalue);
    }
    this.apiServices.changeCurrency(cur);
    this.menu = false;
  }
  currencypop() {
    this.currencyPopup = true;
  }
  closepop() {
    this.currencyPopup = false;
  }
  synchData() {
    this.apiServices.getGlobal().subscribe((res) => {
      // @ts-ignore
      this.globalData = res.data[0];
    });
  }

  public data: { [key: string]: Object; }[] = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda', Code: 'BM' },
    { Name: 'Canada', Code: 'CA' },
    { Name: 'Cameroon', Code: 'CM' },
    { Name: 'Denmark', Code: 'DK' },
    { Name: 'France', Code: 'FR' },
    { Name: 'Finland', Code: 'FI' },
    { Name: 'Germany', Code: 'DE' },
    { Name: 'Greenland', Code: 'GL' },
    { Name: 'Hong Kong', Code: 'HK' },
    { Name: 'India', Code: 'IN' },
    { Name: 'Italy', Code: 'IT' },
    { Name: 'Japan', Code: 'JP' },
    { Name: 'Mexico', Code: 'MX' },
    { Name: 'Norway', Code: 'NO' },
    { Name: 'Poland', Code: 'PL' },
    { Name: 'Switzerland', Code: 'CH' },
    { Name: 'United Kingdom', Code: 'GB' },
    { Name: 'United States', Code: 'US' }
  ];
  toggleMenu() {
    if (this.menu === true) {
      this.menu = false;
    } else {
      this.menu = true;
    }
  }
  linkTo(url) {
    this.menu = false;
    this.router.navigate([url]);
  }
  close() {
    this.menu = false;
  }
  switchLanguage(language: string, trans) {
    this.translate.use(language);
    this.currentTranslated = trans;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang-g' , this.currentTranslated);
      localStorage.setItem('lang-g-g' , language);
    }
    this.menu = false;
  }
  switchTheme() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.mode === 'dark') {
        this.mode = 'light';
        localStorage.setItem('mode', this.mode);
      } else {
        this.mode = 'dark';
        localStorage.setItem('mode', this.mode);
      }
      this.apiServices.changeMessage(this.mode);
    }
    this.menu = false;
  }

}
