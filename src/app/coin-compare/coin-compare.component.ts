import { Component, OnInit , Inject , PLATFORM_ID } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiservicesService} from '../apiservices.service';
import index from '@angular/core/schematics/migrations/move-document';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';
import { isPlatformBrowser ,  } from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';

@Component({
  selector: 'app-coin-compare',
  templateUrl: './coin-compare.component.html',
  styleUrls: ['./coin-compare.component.scss']
})
export class CoinCompareComponent implements OnInit {
  public model: any;
  searchParam = '';
  addedCompare = [];
  compareIDs = [];
  coinData: any;
  compareArray = [];
  loader = true;
  results = [];
  fcurrency;
  fcurrencyValue;
  exResults: any;
  canonical;
  constructor(@Inject(PLATFORM_ID) private platformId: object,    public activeRoute: ActivatedRoute, public apiServices: ApiservicesService, public router: Router, private titleService: Title , private meta: Meta , public sanitizer: DomSanitizer) {
    this.titleService.setTitle('Coin Compare | Tokenncoin');
    this.meta.updateTag({name: 'description', content: 'Tokenncoin Coin Compare feature will help crypto-users compare cryptocurrencies for market assessment and for investment research.'} );
    this.meta.updateTag({property: 'og:title', content: 'Coin Compare | Tokenncoin'} );
    this.meta.updateTag({name: 'twitter:title', content: 'Coin Compare | Tokenncoin'} );
    this.meta.updateTag({property: 'og:title', content: 'Coin Compare | Tokenncoin'} );
    this.meta.updateTag({property: 'og:description', content: 'Tokenncoin Coin Compare feature will help crypto-users compare cryptocurrencies for market assessment and for investment research.'} );
    this.meta.updateTag({name: 'twitter:description', content: 'Tokenncoin Coin Compare feature will help crypto-users compare cryptocurrencies for market assessment and for investment research.'} );
    this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/coin-compare/'} );
  }

  ngOnInit() {
    this.canonical = 'https://tokenncoin.com/coin-compare/';
    if (isPlatformBrowser(this.platformId)) {
      this.fcurrency = localStorage.getItem('localCurrencyFormat');
      this.fcurrencyValue = localStorage.getItem('localCurrencyValue');
      this.refreshSearch();
      if (!localStorage.getItem('compareIDs')) {
        this.addToCompare('bitcoin');
        this.addToCompare('ethereum');
      } else {
        this.compareIDs = localStorage.getItem('compareIDs').split(',');
        const iterationCount = this.compareIDs.length;
        for (let i = 0; i < iterationCount; i++) {
          this.apiServices.getCoin(this.compareIDs[i]).subscribe((res) => {
            // @ts-ignore
            this.addedCompare = res.data;
            // @ts-ignore
            this.compareArray.push(res.data);
            this.loader = false;
          });
        }
      }
    }
  }

  refreshSearch() {
    this.results = [];
    /*let i = 0;*/
    this.apiServices.getGlobalSearch().subscribe((res) => {
      // @ts-ignore
      for (let i = 0 ; i < res.coins.length ; i++) {
        // @ts-ignore
        if (!this.compareIDs.includes(res.coins[i].slug)) {
          // @ts-ignore
          this.results.push(res.coins[i]);
          // @ts-ignore
        }
      }
    });
  }
  onSearch(id) {
    this.addToCompare(id);
  }

  addToCompare(id) {
    this.loader = true;
    this.apiServices.getCoin(id).subscribe((res) => {
      // @ts-ignore
      this.addedCompare = res.data;
      // @ts-ignore
      this.compareArray.push(res.data);
      this.loader = false;
      this.compareIDs.push(id);
      if (isPlatformBrowser(this.platformId)) {
        // @ts-ignore
        localStorage.setItem('compareIDs', this.compareIDs);
      }
    });
    this.refreshSearch();
  }
  removeCompare(arrId) {
        this.compareArray.splice(arrId, 1);
        this.compareIDs.splice(arrId, 1);
    if (isPlatformBrowser(this.platformId)) {
      // @ts-ignore
      localStorage.setItem('compareIDs', this.compareIDs);
      this.refreshSearch();
    }
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.results.filter(v => v.name.toString().toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)),
    )
  formatter = (x: {name: string}) => x.name;
  onKeyEnter(thatkey) {
    if (thatkey.type) {
      this.onSearch(thatkey.slug);
      this.model = null;
    }
  }
}
