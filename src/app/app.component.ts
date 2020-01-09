import {Component, OnInit , Inject , PLATFORM_ID , HostListener} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ApiservicesService} from './apiservices.service';
import {DatePipe, isPlatformBrowser, isPlatformServer} from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {_getOptionScrollPosition} from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe]
})
export class AppComponent implements OnInit {
  title = 'tokenncoinex';
  private currLat: number;
  private currLng: number;
  currencyFormat = '';
  geoCurrency = '';
  currencyValue: any;
  windowScrolled;
  constructor( @Inject(PLATFORM_ID) private platformId: object,   public router: Router, private translate: TranslateService , private apiService: ApiservicesService) {
    translate.setDefaultLang('en');
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 200) {
        this.windowScrolled = true;
      } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 100) {
        this.windowScrolled = false;
      }
    }
  }
  ngOnInit() {
    this.getCurrentLocation();
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('localCurrencyFormat') === null) {
        this.currencyFormat = 'USD';
        localStorage.setItem('localCurrencyFormat', this.currencyFormat);
        localStorage.setItem('localCurrencyValue', '1');
      }
      if (localStorage.getItem('mode') === null) {
        localStorage.setItem('mode', 'dark');
      }
      localStorage.setItem('page-v' , '1' );
    }
    this.router.events.subscribe((evt) => {
      if (isPlatformBrowser(this.platformId)) {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      }
    });
  }
  topNavigation() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        this.apiService.getGeoCurrencies(this.currLat , this.currLng ).subscribe( res => {
          // @ts-ignore
          this.geoCurrency =  res.results[0].annotations.currency.iso_code;
          this.apiService.getCurrencies().subscribe( res2 => {
            let i = 0;
            for (i = 0; i < 54 ; i ++) {
              // @ts-ignore
              if (Object.keys(res2.rates)[i] === this.geoCurrency) {
                if (isPlatformBrowser(this.platformId)) {
                  // @ts-ignore
                  localStorage.setItem('localCurrencyFormat', Object.keys(res2.rates)[i]);
                  // @ts-ignore
                  localStorage.setItem('localCurrencyValue', Object.values(res2.rates)[i]);
                  this.currencyFormat = localStorage.getItem('localCurrencyFormat');
                }
              }
            }
          });
        });
      });
    } else {
    }
  }




}
