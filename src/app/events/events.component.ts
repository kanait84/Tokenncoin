import { Component, OnInit , Inject , PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiservicesService} from '../apiservices.service';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [DatePipe]
})
export class EventsComponent implements OnInit {
  constructor( @Inject(PLATFORM_ID) private platformId: object,   private activeRoute: ActivatedRoute , private apiServices: ApiservicesService, private router: Router, private titleService: Title, private meta: Meta , public sanitizer: DomSanitizer) {
  this.titleService.setTitle('Events | Tokenncoin');
  this.meta.updateTag({name: 'description', content: 'Check out the events listed on Tokenncoin to know the details of upcoming events and conferences for various cryptocurrencies and notable organizations.'} );
    this.meta.updateTag({property: 'og:title', content: 'Events | Tokenncoin'} );
    this.meta.updateTag({name: 'twitter:title', content: 'Events | Tokenncoin'} );
    this.meta.updateTag({property: 'og:title', content: 'Events | Tokenncoin'} );
    this.meta.updateTag({property: 'og:description', content: 'Check out the events listed on Tokenncoin to know the details of upcoming events and conferences for various cryptocurrencies and notable organizations.'} );
    this.meta.updateTag({name: 'twitter:description', content: 'Check out the events listed on Tokenncoin to know the details of upcoming events and conferences for various cryptocurrencies and notable organizations.'} );
    this.meta.updateTag({property: 'og:url', content: 'https://tokenncoin.com/events/'} );
  }
  eventsData: any;
  eventTypes = ['All', 'Conference' , 'Event'];
  selectedEventType = 'All';
  filteredEvents = [];
  loader = true;
  eventsCountry: any;
  selectedCountry = '';
  selectedCountryName = '';
  availableCountries = [];
  myDate: any;
  dateRing = [];
  selectedDate = '';
  canonical;
  ngOnInit() {
    this.canonical = 'https://tokenncoin.com/events/';
    this.synchData();
    this.apiServices.getEventsCountries().subscribe(res => {
      // @ts-ignore
      this.eventsCountry = res.data;
    });
  }
  synchData() {
    let i = 0;
    this.apiServices.getEvents().subscribe((res) => {
      this.eventsData = res;
      if (this.selectedEventType === 'All') {
        // @ts-ignore
        this.filteredEvents = res.data;
        // @ts-ignore
        for (let f = 0; f < res.data.length; f++) {
          // @ts-ignore
          if (res.data[f].country) {
            // @ts-ignore
            if (!this.availableCountries.includes(res.data[f].country)) {
              // @ts-ignore
              this.availableCountries.push(res.data[f].country);
            }
          }
        }
      } else {
        for (i = 0; i < 21; i++) {
          // @ts-ignore
          if (res.data[i].type === this.selectedEventType) {
            // @ts-ignore
            this.filteredEvents.push(res.data[i]);
          }
        }
      }
      this.loader = false;
    });
  }

  eventTypeChange(selected) {
    this.filteredEvents = [];
    this.selectedEventType = selected;
    this.synchData();
  }
  eventCountryChange(code, country) {
    this.selectedCountry = code;
    this.selectedCountryName = country;
  }
  eventDateChange(selectedDate) {
    this.dateRing = [];
    // @ts-ignore
    this.selectedDate = selectedDate;
    if (selectedDate === 'This Week') {
      // @ts-ignore
      for (let i = 0 ; i < (7 - moment().format('DD') ); i++) {
        this.dateRing.push(moment().add(i, 'days').format('YYYY-MM-DD'));
      }
    }
    if (selectedDate === 'Next Week') {
      this.dateRing = [];
      // @ts-ignore
      for (let i = (7 - moment().format('DD') ) ; i < 14 ; i++) {
        this.dateRing.push(moment().add(i, 'days').format('YYYY-MM-DD'));
      }
    }
  }
  eventDateChangeAll() {
    this.dateRing = [];
  }
  redirect(url) {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate([]).then(result => {
        window.open(url, '_blank');
      });
    }
  }
}
