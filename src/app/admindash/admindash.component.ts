import { Component, OnInit ,Inject, PLATFORM_ID} from '@angular/core';
import {ApiservicesService} from '../apiservices.service';
import {ActivatedRoute, Router} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.scss']
})
export class AdmindashComponent implements OnInit {

  searchParam = '';
  SelectedCoin = '';
  CoinDescription = '';
  SelectedCoinName;
  SelectedCoinImage;
  SelectedCoinDescription;
  SelectedCoinMetaDescription;

  results: any;
  exResults: any;

  loader = true;
  public pageValueC: any = 1;
  coinData: any;
  fcurrency = 'usd';
  id: number;
  showComplete;
  userName;
  password;
  LoginView = true;
  CoinView = false;
  EmailView = false;
  EmailData;
  EditableData;
  CoinLinks;
  ShowCoinLinks = false;
  ShowMetaDetails = true;
  newWebsite;
  newExplorer;
  newTechnicalDoc;
  newTwitter;
  newReddit;
  newCode;
  constructor(@Inject(PLATFORM_ID) private platformId: object,   public activeRoute: ActivatedRoute,
              public apiServices: ApiservicesService, public router: Router) {
  }

  DoShowCoinLinks() {
    this.ShowCoinLinks = true;
    this.ShowMetaDetails = false;
  }
  DoShowMetaDetails() {
    this.ShowCoinLinks = false;
    this.ShowMetaDetails = true;
  }
  ngOnInit() {
    this.syncData();
  }
  onAddDescription(selectedCoin , description , metaDescription) {
    this.showComplete = false;
    this.apiServices.coinDescriptions(selectedCoin , description , metaDescription).subscribe(
      () => {
        this.syncData();
      },
      () => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.clear();
          this.LoginView = true;
          this.CoinView = false;
          this.EmailView = false;
        }
      },
      () => {
        this.showComplete = true;
      }
    );
  }
  syncData() {
    /*let i = 0;*/
    this.loader = true;
    this.apiServices.getSearch().subscribe((res) => {
      // @ts-ignore
      this.results = res.data;
    });
    this.loader = false;
    this.showComplete = false;
  }

  toEdit(slug, img , name) {
    console.log(this.EditableData);
    this.showComplete = false;
    this.SelectedCoin = slug;
    this.SelectedCoinImage = img;
    this.SelectedCoinName = name;
    this.apiServices.getCoin(slug).subscribe((res) => {
      // @ts-ignore
      this.EditableData = res.data;
      // @ts-ignore
      this.CoinLinks = res.url;
      // @ts-ignore
      if (res.descript === null) {
        this.SelectedCoinDescription = '';
        // @ts-ignore
        this.SelectedCoinMetaDescription = '';
        // @ts-ignore
        this.CoinLinks = '';
      } else {
        // @ts-ignore
        this.SelectedCoinDescription = res.descript.description;
        // @ts-ignore
        this.SelectedCoinMetaDescription = res.descript.meta_description;
      }
    });
  }
  refreshURLS(){
    this.apiServices.getCoin(this.SelectedCoin).subscribe((res) => {
      // @ts-ignore
      this.EditableData = res.data;
      // @ts-ignore
      this.CoinLinks = res.url;
      // @ts-ignore
    });
  }

  doLogin() {
    this.apiServices.doAdminLogin(this.userName , this.password).subscribe( res => {
      if (isPlatformBrowser(this.platformId)) {
        // @ts-ignore
        localStorage.setItem('A_ID', res.user.id);
        // @ts-ignore
        localStorage.setItem('A_TK', res.token);
      }
    }, () => {} , () => {
      this.LoginView = false;
      this.CoinView = true;
      this.EmailView = false;
    });
  }

  showEmailList() {
    this.apiServices.getEmailRecords().subscribe(res => {
      this.EmailData = res;
      console.log(this.EmailData);
    }, () => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.clear();
        this.LoginView = true;
        this.CoinView = false;
        this.EmailView = false;
      }
    });
    this.LoginView = false;
    this.CoinView = false;
    this.EmailView = true;
  }

  showCoin() {
    this.LoginView = false;
    this.CoinView = true;
    this.EmailView = false;
  }

  updateLinksWebsite(id) {
    this.apiServices.updateLinksWebsite(this.newWebsite, id , this.SelectedCoin)
      .subscribe( res => {}, () => {} , () => { this.newWebsite = null; this.refreshURLS(); });
  }
  updateLinksExplorer(id) {
    this.apiServices.updateLinksExplorer(this.newExplorer, id , this.SelectedCoin)
      .subscribe( res => {}, () => {} , () => { this.newExplorer = null; this.refreshURLS(); });
  }
  updateLinksTechnicalDoc(id) {
    this.apiServices.updateLinksTechnicalDoc(this.newTechnicalDoc, id , this.SelectedCoin)
      .subscribe( res => {}, () => {} , () => { this.newTechnicalDoc = null; this.refreshURLS(); });
  }
  updateLinksTwitter(id) {
    this.apiServices.updateLinksTwitter(this.newTwitter, id , this.SelectedCoin)
      .subscribe( res => {}, () => {} , () => { this.newTwitter = null; this.refreshURLS(); });
  }
  updateLinksReddit(id) {
    this.apiServices.updateLinksReddit(this.newReddit, id , this.SelectedCoin)
      .subscribe( res => {}, () => {} , () => { this.newReddit = null; this.refreshURLS(); });
  }
  updateLinksCode(id) {
    this.apiServices.updateLinksCode(this.newCode, id , this.SelectedCoin)
      .subscribe( res => {}, () => {} , () => { this.newCode = null; this.refreshURLS(); });
  }
  deleteLink(field, value , id) {
    this.apiServices.deleteLink(field, value, id)
      .subscribe( res => {}, () => {} , () => {this.refreshURLS(); });
  }

  downloadRecords() {
    this.apiServices.doDownloadEmail().subscribe();
  }
}
