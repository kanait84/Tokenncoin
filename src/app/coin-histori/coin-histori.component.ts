import {Component, Injectable, OnInit, Input , Inject , PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiservicesService} from '../apiservices.service';
import {CoinComponent} from '../coin/coin.component';
import { isPlatformBrowser } from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-coin-histori',
  templateUrl: './coin-histori.component.html',
  styleUrls: ['./coin-histori.component.scss'],
})
export class CoinHistoriComponent implements OnInit {
  @Input() fcurrency;
  @Input() fcurrencyValue;
  private id: string;
  loader = true;
  constructor( @Inject(PLATFORM_ID) private platformId: object,     private activeRoute: ActivatedRoute , private apiServices: ApiservicesService) { }
  historyData: any;
  exchangeImages: object;
  historyID: any;
  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.synchData(routeParams.id);
    });
  }
  synchData(id) {
    this.apiServices.getCoin(id).subscribe( (res2) => {
      // @ts-ignore
      this.historyID = res2.data._id;
      // @ts-ignore
      this.apiServices.getCoinHistory(this.historyID).subscribe( (res) => {
        // @ts-ignore
        this.historyData = res.data;
        this.loader = false;
      });
    });
  }
}
