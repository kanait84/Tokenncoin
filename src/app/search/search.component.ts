import {Component, ElementRef, OnInit, ViewChild , Inject , PLATFORM_ID} from '@angular/core';
import {ApiservicesService} from '../apiservices.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CoinComponent} from '../coin/coin.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [CoinComponent]
})
export class SearchComponent implements OnInit {
  public model: any;
  constructor( @Inject(PLATFORM_ID) private platformId: object,   public activeRoute: ActivatedRoute, public apiServices: ApiservicesService, public router: Router, public coinPage: CoinComponent) {
  }
  public focusElement: number = -1;
  searchParam = '';
  /*private arrayzero = [];
  private filteredData = [];*/
  results = [];
  exResults = [];
  private id: string;
  ngOnInit() {
    this.results = [];
    /*let i = 0;*/
    this.apiServices.getGlobalSearch().subscribe((res) => {
      // @ts-ignore
      for (let i = 0 ; i < res.coins.length ; i++) {
        // @ts-ignore
        this.results.push(res.coins[i]);
        // @ts-ignore

      }
      // @ts-ignore
      for (let i = 0 ; i < res.exchanges.length ; i++) {
        // @ts-ignore
        this.results.push(res.exchanges[i]);
        // @ts-ignore
      }
    });
  }
  onSearch(id) {
    this.model = null;
    this.router.navigate(['/cryptocurrencies/' + id] );
    this.coinPage.synchData(id);
    this.coinPage.ngOnInit();
  }
  onSearchExchange(id) {
    this.model = null;
    this.searchParam = '';
    this.router.navigate(['/exchanges/' + id]);
  }


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.results.filter(v => v.name.toString().toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)),
    )
  formatter = (x: {name: string}) => x.name;

  visibledropdown() {
  }

  onKeyEnter(thatkey) {
    console.log(thatkey);
    if (thatkey.type) {
      this.onSearch(thatkey.slug);
      this.model = null;
    }
    if (!thatkey.type && thatkey.slug) {
      this.onSearchExchange(thatkey.slug);
      this.model = null;
    }
  }
}
