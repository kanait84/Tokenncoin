import { Component, OnInit , Inject , PLATFORM_ID} from '@angular/core';
import { ApiservicesService} from '../apiservices.service';
import { isPlatformBrowser } from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';
import {DataTable} from 'angular-6-datatable';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.scss'],
  providers: [DataTable]
})
export class ExchangesComponent implements OnInit {
  mode: any;
   exchangeData = [];
   exchangeDataKeys = Object.keys;
   loader = true;
  fcurrency: any;
  fcurrencyValue: any;
  currencies: any;
  comingsoonShow = false;
  rowNumbers = [{}];
  private activePage: number;
  popuptext;
  canonical;
  currencyPopup = false;
  validCurrencies = ['AED' , 'USD', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS',
    'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR'];
  constructor( @Inject(PLATFORM_ID) private platformId: object, private apiServices: ApiservicesService ,   private titleService: Title ,
               private meta: Meta , public sanitizer: DomSanitizer , public dataTable: DataTable) {

    this.titleService.setTitle('Rankings - Exchanges | Tokenncoin');
    this.meta.updateTag({name: 'description', content: 'Tokenncoin ranks various cryptocurrency exchanges. Check out the list and find out which are the leading ones in today’s crypto market.'} );
    this.meta.updateTag({property: 'og:title', content: 'Rankings - Exchanges | Tokenncoin'} );
    this.meta.updateTag({name: 'twitter:title', content: 'Rankings - Exchanges | Tokenncoin'} );
    this.meta.updateTag({property: 'og:title', content: 'Rankings - Exchanges | Tokenncoin'} );
    this.meta.updateTag({property: 'og:description', content: 'Tokenncoin ranks various cryptocurrency exchanges. Check out the list and find out which are the leading ones in today’s crypto market.'} );
    this.meta.updateTag({name: 'twitter:description', content: 'Tokenncoin ranks various cryptocurrency exchanges. Check out the list and find out which are the leading ones in today’s crypto market.'} );
    this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/exchanges/'} );
  }
  ngOnInit() {
    this.apiServices.CurrentcurrencyValue.subscribe(message => this.fcurrency = message);
    this.canonical = 'https://tokenncoin.com/exchanges/';
    if (isPlatformBrowser(this.platformId)) {
      this.mode = localStorage.getItem('mode');
      this.fcurrency = localStorage.getItem('localCurrencyFormat');
      this.fcurrencyValue = localStorage.getItem('localCurrencyValue');
      this.apiServices.getCurrencies().subscribe(res => {
        // @ts-ignore
        this.currencies = res;
      });
    }
    this.apiServices.getExchanges().subscribe((res) => {
      // @ts-ignore
      this.exchangeData = res.data;
      // @ts-ignore
      this.loader = false;
    });
    for (let i = 1 ; i < 300 ; i ++) {
      this.rowNumbers.push(i);
    }
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
  onCurrency(cur , cvalue) {
    if (isPlatformBrowser(this.platformId)) {
      this.fcurrency = cur;
      this.fcurrencyValue = cvalue;
      localStorage.setItem('localCurrencyFormat', cur);
      localStorage.setItem('localCurrencyValue', cvalue);
    }
  }

  toTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 200);
    }
  }
}
