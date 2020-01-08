import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['../aaLinkStyles.css']
})
export class AboutUsComponent implements OnInit {
  canonical;
  constructor(private titleService: Title, private meta: Meta , public sanitizer: DomSanitizer) {
    this.titleService.setTitle('About us | Tokenncoin');
    this.meta.updateTag({name: 'description', content: 'Tokenncoin is a one-stop market research platform that ranks and analyzes all the blockchain-based coins and tokens in the crypto market.'} );
    this.meta.updateTag({property: 'og:title', content: 'About us  | Tokenncoin'} );
    this.meta.updateTag({name: 'twitter:title', content: 'About us  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:title', content: 'About us  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:description', content: 'Tokenncoin is a one-stop market research platform that ranks and analyzes all the blockchain-based coins and tokens in the crypto market.'} );
    this.meta.updateTag({name: 'twitter:description', content: 'Tokenncoin is a one-stop market research platform that ranks and analyzes all the blockchain-based coins and tokens in the crypto market.'} );
    this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/about-us/'} );
  }

  ngOnInit() {
    this.canonical = 'https://tokenncoin.com/about-us/';
  }

}
