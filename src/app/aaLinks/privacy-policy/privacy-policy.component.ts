import { Component, OnInit } from '@angular/core';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['../aaLinkStyles.css']
})
export class PrivacyPolicyComponent implements OnInit {
  canonical;
  constructor(private titleService: Title, private meta: Meta , public sanitizer: DomSanitizer) {
    this.titleService.setTitle('Privacy policy | Tokenncoin');
    this.meta.updateTag({name: 'description', content: 'This page presents our privacy policy regarding any essential information we may collect from you, across our website, looking forward to improving your experience.'} );
    this.meta.updateTag({property: 'og:title', content: 'Privacy policy | Tokenncoin'} );
    this.meta.updateTag({name: 'twitter:title', content: 'Privacy policy  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:title', content: 'Privacy policy  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:description', content: 'This page presents our privacy policy regarding any essential information we may collect from you, across our website, looking forward to improving your experience.'} );
    this.meta.updateTag({name: 'twitter:description', content: 'This page presents our privacy policy regarding any essential information we may collect from you, across our website, looking forward to improving your experience.'} );
    this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/privacy-policy/'} );

  }

  ngOnInit() {
    this.canonical = 'https://tokenncoin.com/privacy-policy/';
  }

}
