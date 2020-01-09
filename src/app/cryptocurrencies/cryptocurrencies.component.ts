import { Component, OnInit , AfterViewInit , Inject , PLATFORM_ID} from '@angular/core';
import {ApiservicesService} from '../apiservices.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {SearchComponent} from '../search/search.component';
import {Title , Meta} from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cryptocurrencies',
  templateUrl: './cryptocurrencies.component.html',
  styleUrls: ['./cryptocurrencies.component.scss'],
  providers: [ HeaderComponent , SearchComponent ]
})
export class CryptocurrenciesComponent implements OnInit, AfterViewInit {

  loader = true;
  pageValueC: number;
  coinData: any;
  coinDD = [];
  fcurrency;
  fcurrencyValue;
  currencies: any;
  id: number;
  mode;
  watchList = [''];
  popuptext;
  comingsoonShow = false;
  private favourites;
  canonical;
  currencyPopup = false;
  changedCurrency;
  moreAbout = false;
  validCurrencies = ['AED' , 'USD', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS',
    'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR'];

  constructor( @Inject(PLATFORM_ID) private platformId: object,   private apiServices: ApiservicesService ,
               private router: Router , private titleService: Title , private meta: Meta , public sanitizer: DomSanitizer , public activeRoute: ActivatedRoute) {
    if (this.router.url === '/') {
      this.canonical = 'https://tokenncoin.com/';
      this.titleService.setTitle('Crypto Market Cap, Live Price, Volume & Graph');
      this.meta.updateTag({property: 'og:title', content: 'Token & Coin Market Cap Live Price, Volume & Graph | Tokenncoin'} );
      this.meta.updateTag({name: 'twitter:title', content: 'Token & Coin Market Cap Live Price, Volume & Graph | Tokenncoin'} );
      this.meta.updateTag({name: 'description', content: 'Unleash your crypto trading skills with TokennCoin\'s seamless live update on price, volume, capitalization & analysis of Bitcoin & other altcoins'} );
      this.meta.updateTag({property: 'og:description', content: 'Unleash your crypto trading skills with TokennCoin\'s seamless live update on price, volume, capitalization & analysis of Bitcoin & other altcoins'} );
      this.meta.updateTag({name: 'twitter:description', content: 'Unleash your crypto trading skills with TokennCoin\'s seamless live update on price, volume, capitalization & analysis of Bitcoin & other altcoins'} );
      this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/'} );

    } else {
      this.canonical = 'https://tokenncoin.com/cryptocurrencies/';
      this.titleService.setTitle('Rankings - Cryptocurrencies | Tokenncoin');
      this.meta.updateTag({property: 'og:title', content: 'Rankings - Cryptocurrencies | Tokenncoin'} );
      this.meta.updateTag({name: 'twitter:title', content: 'Rankings - Cryptocurrencies | Tokenncoin'} );
      this.meta.updateTag({property: 'og:title', content: 'Rankings - Cryptocurrencies | Tokenncoin'} );
      this.meta.updateTag({name: 'description', content: 'Analyze cryptocurrency market cap data. View rankings, charts, coin price movement, and more in the Tokenncoin crypto data platform.'} );
      this.meta.updateTag({property: 'og:description', content: 'Analyze cryptocurrency market cap data. View rankings, charts, coin price movement, and more in the Tokenncoin crypto data platform.'} );
      this.meta.updateTag({name: 'twitter:description', content: 'Analyze cryptocurrency market cap data. View rankings, charts, coin price movement, and more in the Tokenncoin crypto data platform.'} );
      this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/cryptocurrencies/'} );
    }
  }


  ngOnInit() {
    this.apiServices.CurrentcurrencyValue.subscribe(message => this.fcurrency = message);
    if (isPlatformBrowser(this.platformId)) {
      this.fcurrency = localStorage.getItem('localCurrencyFormat');
      this.fcurrencyValue = localStorage.getItem('localCurrencyValue') ;
      this.mode = localStorage.getItem('mode');
      this.favourites = [localStorage.getItem('watchlist')];
      if (localStorage.getItem('page-v') !== null) {
        this.pageValueC = Number(localStorage.getItem('page-v'));
      } else {
        this.pageValueC = 1;
      }
      this.apiServices.getCurrencies().subscribe(res => {
        // @ts-ignore
        this.currencies = res;
      });
      if (localStorage.getItem('watchlist') == null) {
        localStorage.setItem('watchlist', 'added');
      } else {
        this.watchList = JSON.parse(localStorage.getItem('watchlist'));
      }
    }
  }
  syncData() {
    this.activeRoute.params.subscribe(routeParams => {
      if (routeParams.page) {
        this.pageValueC = Number(routeParams.page);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('page-v' , this.pageValueC.toString());
        }
      }
      this.apiServices.getCoins(this.pageValueC).subscribe((res) => {
        // @ts-ignore
        this.coinData = res;
        this.loader = false;
      });
    });
  }
  ngAfterViewInit() {
    this.syncData();
  }
  onCurrency(cur , cvalue) {
    this.fcurrency = cur;
    this.fcurrencyValue = cvalue;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('localCurrencyFormat', cur);
      localStorage.setItem('localCurrencyValue', cvalue);
    }
  }
  filter() {
    this.coinData = [];
    this.apiServices.getCoinsAll().subscribe((res) => {
      // @ts-ignore
      this.coinDD = res;
    });
    for (let i = 0 ; i < 100; i++) {
      // @ts-ignore
      if (this.coinDD.data[i].price_usd < 3) {
        // @ts-ignore
        this.coinData.push(this.coinDD.data[i]);
      } else {
      }
    }
  }
  comingSoon(value) {
    this.comingsoonShow = true;
    this.popuptext = value;
  }
  closepop() {
    this.comingsoonShow = false;
    this.currencyPopup = false;
  }

  adToWatchList(slug) {
    if (isPlatformBrowser(this.platformId)) {
      if (this.watchList.includes(slug)) {
        for (let i = 0; i < this.watchList.length; i++) {
          if (this.watchList[i] === slug) {
            this.watchList.splice(i, 1);
            localStorage.setItem('watchlist', JSON.stringify(this.watchList));
          }
        }
      } else {
        this.watchList.push(slug);
        // @ts-ignore
        localStorage.setItem('watchlist', JSON.stringify(this.watchList));
      }
    }
}


  showMore() {
    if (this.moreAbout === false) {
      this.moreAbout = true;
    } else {
      this.moreAbout = false;
    }
  }
}

