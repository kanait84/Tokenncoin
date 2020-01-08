import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiservicesService} from '../apiservices.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-coinsocial',
  templateUrl: './coinsocial.component.html',
  styleUrls: ['./coinsocial.component.scss']
})
export class CoinsocialComponent implements OnInit {
  coinData: any;
  private id: string;
  constructor(  private activeRoute: ActivatedRoute , private apiServices: ApiservicesService) { }
  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.synchData();
  }
  synchData() {
    this.apiServices.getCoin(this.id).subscribe((res) => {
      this.coinData = res;
    });

  }
}
