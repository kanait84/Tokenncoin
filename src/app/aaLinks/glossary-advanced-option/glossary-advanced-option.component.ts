import { Component, OnInit } from '@angular/core';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-glossary-advanced-option',
  templateUrl: './glossary-advanced-option.component.html',
  styleUrls: ['../aaLinkStyles.css']
})
export class GlossaryAdvancedOptionComponent implements OnInit {
  canonical;
  constructor(private titleService: Title , private meta: Meta , public sanitizer: DomSanitizer) {
    this.titleService.setTitle('Glossary | Tokenncoin');
    this.meta.updateTag({name: 'description', content: 'This glossary contains most of the terms that are commonly mentioned among various cryptocurrency and blockchain groups.'});
    this.meta.updateTag({property: 'og:title', content: 'Glossary | Tokenncoin'} );
    this.meta.updateTag({name: 'twitter:title', content: 'Glossary  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:title', content: 'Glossary  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:description', content: 'This glossary contains most of the terms that are commonly mentioned among various cryptocurrency and blockchain groups.'} );
    this.meta.updateTag({name: 'twitter:description', content: 'This glossary contains most of the terms that are commonly mentioned among various cryptocurrency and blockchain groups.'} );
    this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/advance-crypto-glossary/'} );
  }

  ngOnInit() {
    this.canonical = 'https://tokenncoin.com/advance-crypto-glossary/';
  }

}
