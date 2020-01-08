import { Component, OnInit , Inject , PLATFORM_ID} from '@angular/core';
import {ApiservicesService} from '../apiservices.service';
import {Router} from '@angular/router';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newsData = [];
  loader = true;
  newsSources = [];
  selectedSource = 'ALL';
  searchParam = '';
  selectedCategory = '';
  selectedNewsType = '';
  defaultURL = 'assets/images/default-news.jpg';
  catergoryFilterOptions = [];
  canonical;
  constructor( @Inject(PLATFORM_ID) private platformId: object,
               private  apiServices: ApiservicesService , private router: Router, private titleService: Title, private meta: Meta , public sanitizer: DomSanitizer) {
    this.titleService.setTitle('News | Tokenncoin');
    this.meta.updateTag({name: 'description', content: 'Tokenncoin gives informed news on the recent developments in the cryptocurrency sphere. Check the latest updates on your favorite cryptocurrency.'} );
    this.meta.updateTag({property: 'og:title', content: 'News | Tokenncoin'} );
    this.meta.updateTag({name: 'twitter:title', content: 'News | Tokenncoin'} );
    this.meta.updateTag({property: 'og:title', content: 'News | Tokenncoin'} );
    this.meta.updateTag({property: 'og:description', content: 'Tokenncoin gives informed news on the recent developments in the cryptocurrency sphere. Check the latest updates on your favorite cryptocurrency.'} );
    this.meta.updateTag({name: 'twitter:description', content: 'Tokenncoin gives informed news on the recent developments in the cryptocurrency sphere. Check the latest updates on your favorite cryptocurrency.'} );
    this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/news/'} );
  }

  ngOnInit() {
    this.canonical = 'https://tokenncoin.com/news/';
    this.syncData();
  }
  syncData() {
    if (this.selectedNewsType === '') {
      this.apiServices.getNews()
        .subscribe(res => {
          // @ts-ignore
          this.newsData = res.data;
          // @ts-ignore
          for(let i = 0 ; i < res.data.length ; i++) {
            // @ts-ignore
            if (!this.catergoryFilterOptions.includes(res.data[i].catagory)) {
              // @ts-ignore
              this.catergoryFilterOptions.push(res.data[i].catagory);
            }
          }
          this.loader = false;
        });
    }
    if (this.selectedNewsType === 'top') {
      this.apiServices.getNewsTop()
        .subscribe(res => {
          // @ts-ignore
          this.newsData = res.data;
          // @ts-ignore
          for(let i = 0 ; i < res.data.length ; i++) {
            // @ts-ignore
            if (!this.catergoryFilterOptions.includes(res.data[i].catagory)) {
              // @ts-ignore
              this.catergoryFilterOptions.push(res.data[i].catagory);
            }
          }
          this.loader = false;
        });
    }
  }
  redirect(url) {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate([]).then(result => {
        window.open(url, '_blank');
      });
    }
  }
  catergoryChange(selected) {
    this.selectedCategory = selected;
  }
  typeChanges(value) {
    this.selectedNewsType = value;
    this.syncData();
  }
  updateURL() {

  }
}
