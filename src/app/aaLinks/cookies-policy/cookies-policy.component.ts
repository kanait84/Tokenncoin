import { Component, OnInit } from '@angular/core';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-cookies-policy',
  templateUrl: './cookies-policy.component.html',
  styleUrls: ['../aaLinkStyles.css']
})
export class CookiesPolicyComponent implements OnInit {
  canonical;
  constructor(private titleService: Title , private meta: Meta , public sanitizer: DomSanitizer) {
    this.titleService.setTitle('Cookies Policy | Tokenncoin');
    this.meta.updateTag({name: 'description', content: 'This page presents our privacy policy regarding any essential information we may collect from you, across our website, looking forward to improving your experience.'} );
    this.meta.updateTag({property: 'og:title', content: 'Cookies Policy  | Tokenncoin'} );
    this.meta.updateTag({name: 'twitter:title', content: 'Cookies Policy  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:title', content: 'Cookies Policy  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:description', content: 'This page presents our privacy policy regarding any essential information we may collect from you, across our website, looking forward to improving your experience.'} );
    this.meta.updateTag({name: 'twitter:description', content: 'This page presents our privacy policy regarding any essential information we may collect from you, across our website, looking forward to improving your experience.'} );
    this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/cookies-policy/'} );

  }

  ngOnInit() {
    this.canonical = 'https://tokenncoin.com/cookies-policy/';
  }

}
