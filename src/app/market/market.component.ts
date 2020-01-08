import {Component, Injectable, OnInit , OnDestroy ,NgZone , Inject , PLATFORM_ID} from '@angular/core';
import { ApiservicesService} from '../apiservices.service';
import {ActivatedRoute} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {DomSanitizer, Title} from '@angular/platform-browser';
@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})

export class MarketComponent implements OnInit {
  exchangeData: any;
  exchangePairs: any;
  private id: any;
  currencies: any;
  fcurrency: any;
  fcurrencyValue: any;
  validCurrencies = ['AED' , 'USD', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS',
    'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR'];
  canonical;
  currencyPopup =  false;
  constructor( @Inject(PLATFORM_ID) private platformId: object,    private activeRoute: ActivatedRoute , private apiServices: ApiservicesService ,  private titleService: Title , public sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.apiServices.CurrentcurrencyValue.subscribe(message => this.fcurrency = message);
    if (isPlatformBrowser(this.platformId)) {
      this.fcurrency = localStorage.getItem('localCurrencyFormat');
      this.fcurrencyValue = parseFloat(localStorage.getItem('localCurrencyValue'));
      this.activeRoute.params.subscribe(routeParams => {
        this.synchData(routeParams.id);
      });
      this.apiServices.getCurrencies().subscribe(res => {
        // @ts-ignore
        this.currencies = res;
      });
    }
  }
  currencypop() {
    this.currencyPopup = true;
  }
  closepop() {
    this.currencyPopup = false;
  }
  synchData(id) {
    this.apiServices.getExchange(id).subscribe((res) => {
      // @ts-ignore
      this.exchangeData = res.data;
      // @ts-ignore
      this.titleService.setTitle(res.data.name + ' - Exchanges | Tokenncoin');
      // @ts-ignore
      this.meta.updateTag({property: 'og:title', content: res.data.name + ' - Exchanges | Tokenncoin'} );
      // @ts-ignore
      this.meta.updateTag({name: 'twitter:title', content: res.data.name + ' - Exchanges | Tokenncoin'} );
      // @ts-ignore
      this.meta.updateTag({property: 'og:title', content: res.data.name + ' - Exchanges | Tokenncoin'} );
      // @ts-ignore
      this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/exchanges/' + id + '/'} );
      // @ts-ignore
      /*this.apiServices.getExchangeChart(res.data._id).subscribe( res2 => {
      });*/
      this.canonical = 'https://tokenncoin.com/exchanges/' + id + '/';
    });
    this.apiServices.getExchangePairs(id).subscribe((res) => {
      // @ts-ignore
      this.exchangePairs = res.data;
    });
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
