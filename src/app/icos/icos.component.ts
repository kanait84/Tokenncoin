import { Component, OnInit , Inject , PLATFORM_ID} from '@angular/core';
import {ApiservicesService} from '../apiservices.service';
import * as moment from 'moment';
import { isPlatformBrowser } from '@angular/common';
import {Router} from '@angular/router';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
@Component({
  selector: 'app-icos',
  templateUrl: './icos.component.html',
  styleUrls: ['./icos.component.scss']
})
export class IcosComponent implements OnInit {

  icosData = [];
  filterOptions = ['All', 'Pre-Sale' , 'Ongoing' , 'Upcoming' , 'Closed'];
  loader = true;
  filterString = 'All';
  canonical;
  constructor( @Inject(PLATFORM_ID) private platformId: object,   private apiServices: ApiservicesService , private  router: Router, private titleService: Title, private meta: Meta , public sanitizer: DomSanitizer) {
    this.titleService.setTitle('ICOS | Tokenncoin');
    this.meta.updateTag({name: 'description', content: 'Interested to invest in any Initial Coin Offerings? Tokenncoin gives a comprehensive list of pre-sale, ongoing, and upcoming ICOs.'} );
    this.meta.updateTag({property: 'og:title', content: 'ICOS | Tokenncoin'} );
    this.meta.updateTag({name: 'twitter:title', content: 'ICOS | Tokenncoin'} );
    this.meta.updateTag({property: 'og:title', content: 'ICOS | Tokenncoin'} );
    this.meta.updateTag({property: 'og:description', content: 'Interested to invest in any Initial Coin Offerings? Tokenncoin gives a comprehensive list of pre-sale, ongoing, and upcoming ICOs.'} );
    this.meta.updateTag({name: 'twitter:description', content: 'Interested to invest in any Initial Coin Offerings? Tokenncoin gives a comprehensive list of pre-sale, ongoing, and upcoming ICOs.'} );
    this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/icos/'} );
  }
  ngOnInit() {
    this.canonical = 'https://tokenncoin.com/icos/';
  this.syncData();
  }
  syncData() {
    this.apiServices.geticos().subscribe((res) => {
      // @ts-ignore
      if (this.filterString === 'All') {
        // @ts-ignore
        this.icosData = res.data;
        this.loader = false;
      }
      if (this.filterString === 'Closed') {
        // @ts-ignore
        this.apiServices.getICOClosed().subscribe( res => {
          // @ts-ignore
          this.icosData = res.data;
          this.loader = false;
        });
      }
      else {
        let i = 0;
        // @ts-ignore
        for (i = 0 ; i < res.data.length ; i++) {
          // @ts-ignore
          if (res.data[i].status === this.filterString) {
            // @ts-ignore
            this.icosData.push(res.data[i]);
          }
        }
        this.loader = false;
      }
    });
  }

  filter(key) {
    this.loader = true;
    this.icosData = [];
    this.filterString = key;
    this.syncData();
  }
  onRedirect(url) {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate([]).then(result => {
        window.open(url, '_blank');
      });
    }
  }
  toTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 100);
    }
  }
}
