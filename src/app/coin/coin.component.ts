import {Component, Injectable, OnInit , Inject , PLATFORM_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService} from '../apiservices.service';
import {Title, Meta, DomSanitizer} from '@angular/platform-browser';
import { isPlatformBrowser , isPlatformServer } from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';


@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent implements OnInit {
  markets = false;
  graphs = false;
  social = false;
  tools = false;
  rating = false;
  historicalData = false;
  overView = true;
  id: any;
  coinData: any;
  currencies: any;
  convertValue;
  currencyString;
  canonical;
  currencyPopup = false;
  watchList = [''];
  favourites;
  CoinAdditionalLinks;
  validCurrencies = ['AED' , 'USD', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS',
    'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR'];
  constructor( @Inject(PLATFORM_ID) private platformId: object, public activeRoute: ActivatedRoute ,   public apiServices: ApiservicesService , private titleService: Title , private meta: Meta , private router: Router , public sanitizer: DomSanitizer) {
  }
  ngOnInit() {
    this.apiServices.CurrentcurrencyValue.subscribe(message => this.currencyString = message);
    if (isPlatformBrowser(this.platformId)) {
      this.favourites = [localStorage.getItem('watchlist')];
      this.convertValue = parseFloat(localStorage.getItem('localCurrencyValue'));
      this.currencyString = localStorage.getItem('localCurrencyFormat');
      if (!localStorage.getItem('watchlist') || localStorage.getItem('watchlist') === 'added') {
        localStorage.setItem('watchlist', JSON.stringify(this.watchList));
      } else {
        this.watchList = JSON.parse(localStorage.getItem('watchlist'));
      }
    }
      this.activeRoute.params.subscribe(routeParams => {
        this.synchData(routeParams.id);
        this.canonical = 'https://tokenncoin.com/cryptocurrencies/' + routeParams.id + '/';
      });
      this.apiServices.getCurrencies().subscribe(res => {
        // @ts-ignore
        this.currencies = res;
      });

  }
  currencypop() {
    this.currencyPopup = true;
  }
  closepop() {
    this.currencyPopup = false;
  }
  synchData(id) {
    this.apiServices.getCoin(id).subscribe((res) => {
      // @ts-ignore
      this.coinData = res.data;
      // @ts-ignore
      this.CoinAdditionalLinks = res.url;
      if (isPlatformServer(this.platformId)) {
        // @ts-ignore
        this.titleService.setTitle(res.data.name + '(' + res.data.symbol + ')' + ' Price - $' + res.data.price_usd + ', Market Cap, Live | Tokenncoin');
        // @ts-ignore
        this.meta.updateTag({name: 'description', content: res.descript.meta_description});
      }
      if (isPlatformBrowser(this.platformId)) {
        // @ts-ignore
        this.titleService.setTitle(res.data.name + '(' + res.data.symbol + ')' + ' Price - $' + res.data.price_usd + ', Market Cap, Live | Tokenncoin');
        // @ts-ignore
        this.meta.updateTag({name: 'description', content: res.descript.meta_description});
        // @ts-ignore
        this.meta.updateTag({property: 'og:title', content: res.data.name + '(' + res.data.symbol + ')' + ' Price - $' + res.data.price_usd + ', Market Cap, Live | Tokenncoin'} );
        // @ts-ignore
        this.meta.updateTag({name: 'twitter:title', content: res.data.name + '(' + res.data.symbol + ')' + ' Price - $' + res.data.price_usd + ', Market Cap, Live | Tokenncoin'} );
        // @ts-ignore
        this.meta.updateTag({property: 'og:title', content: res.data.name + '(' + res.data.symbol + ')' + ' Price - $' + res.data.price_usd + ', Market Cap, Live | Tokenncoin'} );
        // @ts-ignore
        this.meta.updateTag({property: 'og:description', content: res.descript.meta_description} );
        // @ts-ignore
        this.meta.updateTag({name: 'twitter:description', content: res.descript.meta_description} );
        /*// @ts-ignore
        this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/cryptocurrencies/' + res.data.slug + '/'} );*/
      }
    }, () => {
      this.router.navigate(['/']);
    });
  }
/*NAVIGATIONS*/
  hideAll() {
    this.graphs = false; this.markets = false; this.social = false ; this.tools = false ; this.rating = false;
    this.historicalData = false; this.overView = false;
  }
  chartsOn() {
    if (this.graphs === false)  {
      this.hideAll();
      this.graphs = true;
    }else {
      this.overViewOn();
    }
  }

  MarketsOn() {
    this.hideAll();
    this.markets = true;
  }
  socialOn() {
    this.hideAll();
    this.social = true;
  }
  toolsOn() {
    this.hideAll();
    this.tools = true;
  }
  ratingOn() {
    this.hideAll();
    this.rating = true;
  }
  historicalDataOn() {
    this.hideAll();
    this.historicalData = true;
  }

  overViewOn() {
    this.hideAll();
    this.overView = true;
  }

  onCurrency(cur , cvalue) {
    if (isPlatformBrowser(this.platformId)) {
      this.currencyString = cur;
      this.convertValue = cvalue;
      localStorage.setItem('localCurrencyFormat', cur);
      localStorage.setItem('localCurrencyValue', cvalue);
    }
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


}
