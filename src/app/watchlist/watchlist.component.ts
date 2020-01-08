import { Component, OnInit , Inject , PLATFORM_ID} from '@angular/core';
import {ApiservicesService} from '../apiservices.service';
import { isPlatformBrowser } from '@angular/common';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';
import {LOCAL_STORAGE, WINDOW} from "@ng-toolkit/universal";
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {Observable} from 'rxjs';
import {__await} from 'tslib';
import {async} from 'q';
import {Router} from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  mode;
  mylist: any;
  coinData;
  currencies: any;
  fcurrency: any;
  fcurrencyValue: any;
  comingsoonShow = false;
  popuptext;
  canonical;
  currencyPopup = false;
  validCurrencies = ['AED' , 'USD', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS',
    'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR'];
  constructor( @Inject(PLATFORM_ID) private platformId: object,   public  apiServices: ApiservicesService ,   private titleService: Title, private meta: Meta , private router: Router , public sanitizer: DomSanitizer) {
    this.titleService.setTitle('Watchlist - Cryptocurrencies | Tokenncoin');
    this.meta.updateTag({name: 'description', content: 'Create your cryptocurrency watchlist with Tokenncoin\'s crypto watchlist feature. You can easily view your saved crypto in this page.'} );
    this.meta.updateTag({property: 'og:title', content: 'Watchlist - Cryptocurrencies | Tokenncoin'} );
    this.meta.updateTag({name: 'twitter:title', content: 'Watchlist - Cryptocurrencies | Tokenncoin'} );
    this.meta.updateTag({property: 'og:title', content: 'Watchlist - Cryptocurrencies | Tokenncoin'} );
    this.meta.updateTag({property: 'og:description', content: 'Create your cryptocurrency watchlist with Tokenncoin\'s crypto watchlist feature. You can easily view your saved crypto in this page.'} );
    this.meta.updateTag({name: 'twitter:description', content: 'Create your cryptocurrency watchlist with Tokenncoin\'s crypto watchlist feature. You can easily view your saved crypto in this page.'} );
    this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/watchlist/'} );
  }
  comingSoon(value) {
    this.comingsoonShow = true;
    this.popuptext = value;
  }
  currencypop() {
    this.currencyPopup = true;
  }
  closepop() {
    this.comingsoonShow = false;
    this.currencyPopup = false;
  }
   ngOnInit() {
    this.apiServices.CurrentcurrencyValue.subscribe(message => this.fcurrency = message);
    this.canonical = 'https://tokenncoin/watchlist/';
    if (isPlatformBrowser(this.platformId)) {
      this.mode = localStorage.getItem('mode');
      this.fcurrency = localStorage.getItem('localCurrencyFormat');
      this.fcurrencyValue = localStorage.getItem('localCurrencyValue');
      this.apiServices.getCurrencies().subscribe(res => {
        // @ts-ignore
        this.currencies = res;
      });
    }
    this.coinData = [];
    if (isPlatformBrowser(this.platformId)) {
      this.mylist = JSON.parse(localStorage.getItem('watchlist'));
      for (let i = 1; i < JSON.parse(localStorage.getItem('watchlist')).length; ++i) {
        this.apiServices.getCoin(this.mylist[i]).subscribe((res) => {
          // @ts-ignore
            this.coinData.push(res.data);
        });
      }
    }
  }
  removeWatch(slug) {
    for (let i = 1 ; i < this.mylist.length ; i++) {
      if (this.mylist[i] === slug) {
        this.mylist.splice(i, 1);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('watchlist', JSON.stringify(this.mylist));
        }
      }
    }
    this.ngOnInit();
  }

  onCurrency(cur , cvalue) {
    if (isPlatformBrowser(this.platformId)) {
      this.fcurrency = cur;
      this.fcurrencyValue = cvalue;
      localStorage.setItem('localCurrencyFormat', cur);
      localStorage.setItem('localCurrencyValue', cvalue);
    }
  }
}
