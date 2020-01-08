import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['../aaLinkStyles.css']
})
export class FaqComponent implements OnInit {
  panelOpenState = false;
  canonical;
  constructor(private titleService: Title, private meta: Meta , public sanitizer: DomSanitizer) {
    this.titleService.setTitle('FAQ | Tokenncoin');
    this.meta.updateTag({name: 'description', content: 'This page is where users can find answers to questions that are commonly asked regarding the Tokenncoin platform.'} );
    this.meta.updateTag({property: 'og:title', content: 'FAQ | Tokenncoin'} );
    this.meta.updateTag({name: 'twitter:title', content: 'FAQ  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:title', content: 'FAQ  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:description', content: 'This page is where users can find answers to questions that are commonly asked regarding the Tokenncoin platform.'} );
    this.meta.updateTag({name: 'twitter:description', content: 'This page is where users can find answers to questions that are commonly asked regarding the Tokenncoin platform.'} );
    this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/faq/'} );
  }

  ngOnInit() {
    this.canonical = 'https://tokenncoin.com/faq/';
  }

}
