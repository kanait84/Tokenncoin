import {Component, Injectable, OnInit, Input , Inject , PLATFORM_ID} from '@angular/core';
import { ApiservicesService} from '../apiservices.service';
import {ActivatedRoute} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-markets',
  templateUrl: './coinmarkets.component.html',
  styleUrls: ['./coinmarkets.component.scss']
})

export class CoinmarketsComponent implements OnInit {
  @Input() fcurrency;
  @Input() fcurrencyValue;
  private id: string;
  loader = true;
  selectedSymbol = '';
  constructor( @Inject(PLATFORM_ID) private platformId: object,    private activeRoute: ActivatedRoute , private apiServices: ApiservicesService) { }
  exchangeData: any;
  exchangeImages: object;
  ngOnInit() {
    this.loader = true;
    this.activeRoute.params.subscribe(routeParams => {
      this.synchData(routeParams.id);
    });
  }

  synchData(id) {
    this.apiServices.getCoin(id).subscribe( (res) => {
      // @ts-ignore
      this.selectedSymbol = res.data.symbol;
      this.apiServices.getCoinPairs(this.selectedSymbol).subscribe((res2) => {
        // @ts-ignore
        this.exchangeData = res2;
        this.loader = false;
      });
    });
  }

  currencyChange( currencyFormat, currencyValue) {
    this.fcurrency = currencyFormat;
    this.fcurrencyValue = currencyValue;
  }

}
