import { Component, OnInit } from '@angular/core';
import {Title, Meta, DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['../aaLinkStyles.css']
})
export class GlossaryComponent implements OnInit {
  canonical;
  constructor(private titleService: Title , private meta: Meta , public sanitizer: DomSanitizer) {
    this.titleService.setTitle('Glossary | Tokenncoin');
    this.meta.updateTag({name: 'description', content: 'This glossary contains most of the terms that are commonly mentioned among various cryptocurrency and blockchain groups.'});
    this.meta.updateTag({property: 'og:title', content: 'Glossary | Tokenncoin'} );
    this.meta.updateTag({name: 'twitter:title', content: 'Glossary  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:title', content: 'Glossary  | Tokenncoin'} );
    this.meta.updateTag({property: 'og:description', content: 'This glossary contains most of the terms that are commonly mentioned among various cryptocurrency and blockchain groups.'} );
    this.meta.updateTag({name: 'twitter:description', content: 'This glossary contains most of the terms that are commonly mentioned among various cryptocurrency and blockchain groups.'} );
    this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/beginner-crypto-glossary/'} );
  }
  selected = 'basic';
  ngOnInit() {
    this.canonical = 'https://tokenncoin.com/beginner-crypto-glossary/';
  }
  selectionChanged(value) {
    this.selected = value;
  }

}
