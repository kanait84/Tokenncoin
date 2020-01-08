import { Component, OnInit } from '@angular/core';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['../aaLinkStyles.css']
})
export class DisclaimerComponent implements OnInit {
  canonical;
  constructor(private titleService: Title , private meta: Meta , public sanitizer: DomSanitizer) {
    this.titleService.setTitle('Disclaimer | Tokenncoin');
    this.meta.updateTag({name: 'description', content: 'This page will enlighten our users on the information that they must keep in mind upon visiting the Tokenncoin website.'} );
    this.meta.updateTag({property: 'og:title', content: 'Disclaimer | Tokenncoin'} );
    this.meta.updateTag({name: 'twitter:title', content: 'Disclaimer  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:title', content: 'Disclaimer  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:description', content: 'This page will enlighten our users on the information that they must keep in mind upon visiting the Tokenncoin website.'} );
    this.meta.updateTag({name: 'twitter:description', content: 'This page will enlighten our users on the information that they must keep in mind upon visiting the Tokenncoin website.'} );
    this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/disclaimer/'} );

  }

  ngOnInit() {
    this.canonical = 'https://tokenncoin.com/disclaimer/';
  }

}
