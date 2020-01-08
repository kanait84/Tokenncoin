import { Component, OnInit } from '@angular/core';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-terms-ncondition',
  templateUrl: './terms-ncondition.component.html',
  styleUrls: ['../aaLinkStyles.css']
})
export class TermsNConditionComponent implements OnInit {
  canonical;
  constructor(private titleService: Title, private meta: Meta , public sanitizer: DomSanitizer) {
    this.titleService.setTitle('Terms and Conditions | Tokenncoin');
    this.meta.updateTag({name: 'description', content: 'This page serves to present Tokenncoin Terms & Conditions govern your access to and of this online page. We expect you to read the following important information.'} );
    this.meta.updateTag({property: 'og:title', content: 'Terms and Conditions | Tokenncoin'} );
    this.meta.updateTag({name: 'twitter:title', content: 'Terms and Conditions  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:title', content: 'Terms and Conditions  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:description', content: 'This page serves to present Tokenncoin Terms & Conditions govern your access to and of this online page. We expect you to read the following important information.'} );
    this.meta.updateTag({name: 'twitter:description', content: 'This page serves to present Tokenncoin Terms & Conditions govern your access to and of this online page. We expect you to read the following important information.'} );
    this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/terms-and-conditions/'} );
  }

  ngOnInit() {
    this.canonical = 'https://tokenncoin.com/terms-and-conditions/';
  }

}
