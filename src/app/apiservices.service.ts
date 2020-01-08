import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';




@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  constructor(public http: HttpClient , @Inject(PLATFORM_ID) private platformId: object) {
  }
  exchangeURL = ''; globalURL = ''; searchURL = ''; newsURL = ''; eventsURL = ''; eventsCountryURL = ''; updateCoinListURL = ''; coinHistoryURL = '';
  coinURL = ''; coinsURL = ''; currenciesURL = ''; icosURL = '';  exchangePairsURL = ''; coinPareURL = ''; addDescriptionURL = '';
  singleCoinURL: string; geoCurrencyURL = '';  icoClosedURL = ''; subscriptionURL = '';
  lineChartURL = ''; globalSearchURL = '';

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private convertingCurrency = new BehaviorSubject('usd');
  CurrentcurrencyValue = this.convertingCurrency.asObservable();

  changeCurrency(currencyValue: string) {
    this.convertingCurrency.next(currencyValue);
  }
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  getCoins(pageNum) {
    this.coinsURL = 'https://api.tokenncoin.com/coins/latest?page=' + pageNum;
    return this.http.get(this.coinsURL);
  }
  getCoinsAll() {
    this.coinsURL = 'https://api.tokenncoin.com/coins/latest';
    return this.http.get(this.coinsURL);
  }
  getExchanges() {
    this.coinsURL = 'https://api.tokenncoin.com/exchanges/latest';
    return this.http.get(this.coinsURL);
  }

  getExchange(exchangeData) {
    this.exchangeURL = 'https://api.tokenncoin.com/exchanges/info?name=' + exchangeData;
    return this.http.get(this.exchangeURL);
  }
  getExchangePairs(exchangeData) {
    this.exchangePairsURL = 'https://api.tokenncoin.com/exchanges/pairs/info?slug=' + exchangeData;
    return this.http.get(this.exchangePairsURL);
  }

  getCoinPairs(coin) {
    this.coinPareURL = 'https://api.tokenncoin.com/coins/pairs/info?symbol=' + coin;
    return this.http.get(this.coinPareURL);
  }

  getCoin(coindata) {
  this.coinURL = 'https://api.tokenncoin.com/coins/info?name=' + coindata  ;
  return this.http.get(this.coinURL);
  }

  getCoinHistory(coindata) {
    this.coinHistoryURL = 'https://api.tokenncoin.com/historical/latest/' + coindata + '?limit=90'  ;
    return this.http.get(this.coinHistoryURL);
  }

  getGlobal() {
    this.globalURL = 'https://api.tokenncoin.com/global/latest' ;
    return this.http.get(this.globalURL);
  }

  getSearch() {
    this.searchURL = 'https://api.tokenncoin.com/coins/search' ;
    return this.http.get(this.searchURL);
  }
  geticos() {
    this.icosURL = 'https://api.tokenncoin.com/ico/latest';
    return this.http.get(this.icosURL);
  }
  getEvents() {
    this.eventsURL = 'https://api.coingecko.com/api/v3/events';
    return this.http.get(this.eventsURL);
  }

  getEventsCountries() {
    this.eventsCountryURL = ' https://api.coingecko.com/api/v3/events/countries';
    return this.http.get(this.eventsCountryURL);
  }
  getNews() {
    this.newsURL = 'https://api.tokenncoin.com/news/all';
    return this.http.get(this.newsURL);
  }
  getNewsTop() {
    this.newsURL = 'https://api.tokenncoin.com/news/latest';
    return this.http.get(this.newsURL);
  }
  coinDescriptions(slug , description , meta) {
    if (isPlatformBrowser(this.platformId)) {
      const headers = new HttpHeaders({
        'tac-access-token': localStorage.getItem('A_TK'),
        id: localStorage.getItem('A_ID')
      });
      this.addDescriptionURL = 'https://api.tokenncoin.com/admin/description';
      return this.http.post(this.addDescriptionURL, {slug, description, meta} , {headers});
    }
  }
  updateCoinList() {
    this.updateCoinListURL = 'https://api.tokenncoin.com/coins/updated_list';
    return this.http.get(this.updateCoinListURL);
  }
  getCurrencies() {
    this.currenciesURL = 'https://v3.exchangerate-api.com/bulk/eed52e5480ad3296e79f3a0b/USD';
    return this.http.get(this.currenciesURL);
  }
  getGeoCurrencies(lat, long) {
    // tslint:disable-next-line:max-line-length
    this.geoCurrencyURL = 'https://api.opencagedata.com/geocode/v1/json?q=' + lat + '%2C ' + long + '&key=68ecd8f478fb404db3967459b2e88a45&language=en&pretty=1';
    return this.http.get(this.geoCurrencyURL);
  }
  getICOClosed() {
    this.icoClosedURL = 'https://api.tokenncoin.com/ico/latest?status=Closed';
    return this.http.get(this.icoClosedURL);
  }
  subscriptionAdding(email) {
    this.subscriptionURL = 'https://api.tokenncoin.com/global/register';
    return this.http.post(this.subscriptionURL, {email});
  }

  getSingleCoin(slug) {
    this.singleCoinURL = 'https://api.tokenncoin.com/coins/coin_data/' + slug;
    return this.http.get(this.singleCoinURL);
  }
  getLineChart(id) {
    this.lineChartURL = 'https://api.tokenncoin.com/chart/latest/' + id;
    return this.http.get(this.lineChartURL);
  }
  getGlobalSearch() {
    this.globalSearchURL = 'https://api.tokenncoin.com/global/search';
    return this.http.get(this.globalSearchURL);
  }
  doAdminLogin(email , password) {
    return this.http.post('https://api.tokenncoin.com' + '/admin/login' , {email , password});
  }

  getEmailRecords() {
    if (isPlatformBrowser(this.platformId)) {
      const headers = new HttpHeaders({
        'tac-access-token': localStorage.getItem('A_TK'),
        id: localStorage.getItem('A_ID')
      });
      return this.http.get('https://api.tokenncoin.com' + '/admin/EmailList' , {headers});
    }
  }
  doDownloadEmail() {
    if (isPlatformBrowser(this.platformId)) {
      const headers = new HttpHeaders({
        'tac-access-token': localStorage.getItem('A_TK'),
        id: localStorage.getItem('A_ID')
      });
      return this.http.get('https://api.tokenncoin.com' + '/admin/list_download' , {headers});
    }
  }

  updateLinksWebsite(website, id , slug) {
    if (isPlatformBrowser(this.platformId)) {
      const headers = new HttpHeaders({
        'tac-access-token': localStorage.getItem('A_TK'),
        id: localStorage.getItem('A_ID')
      });
      return this.http.post('https://api.tokenncoin.com' + '/admin/setInfo/' + id ,
        {website , slug}, {headers});
    }
  }
  updateLinksExplorer(explorer, id , slug) {
    if (isPlatformBrowser(this.platformId)) {
      const headers = new HttpHeaders({
        'tac-access-token': localStorage.getItem('A_TK'),
        id: localStorage.getItem('A_ID')
      });
      return this.http.post('https://api.tokenncoin.com' + '/admin/setInfo/' + id ,
        {explorer , slug}, {headers});
    }
  }
  updateLinksTechnicalDoc(technicalDoc, id , slug) {
    if (isPlatformBrowser(this.platformId)) {
      const headers = new HttpHeaders({
        'tac-access-token': localStorage.getItem('A_TK'),
        id: localStorage.getItem('A_ID')
      });
      return this.http.post('https://api.tokenncoin.com' + '/admin/setInfo/' + id ,
        {technical_doc: technicalDoc , slug}, {headers});
    }
  }

  updateLinksTwitter(twitter, id , slug) {
    if (isPlatformBrowser(this.platformId)) {
      const headers = new HttpHeaders({
        'tac-access-token': localStorage.getItem('A_TK'),
        id: localStorage.getItem('A_ID')
      });
      return this.http.post('https://api.tokenncoin.com' + '/admin/setInfo/' + id ,
        {twitter , slug}, {headers});
    }
  }

  updateLinksReddit(reddit, id , slug) {
    if (isPlatformBrowser(this.platformId)) {
      const headers = new HttpHeaders({
        'tac-access-token': localStorage.getItem('A_TK'),
        id: localStorage.getItem('A_ID')
      });
      return this.http.post('https://api.tokenncoin.com' + '/admin/setInfo/' + id ,
        {reddit , slug}, {headers});
    }
  }

  updateLinksCode(code, id , slug) {
    if (isPlatformBrowser(this.platformId)) {
      const headers = new HttpHeaders({
        'tac-access-token': localStorage.getItem('A_TK'),
        id: localStorage.getItem('A_ID')
      });
      return this.http.post('https://api.tokenncoin.com' + '/admin/setInfo/' + id ,
        {source_code: code , slug}, {headers});
    }
  }

  deleteLink(field, value, id) {
    if (isPlatformBrowser(this.platformId)) {
      const headers = new HttpHeaders({
        'tac-access-token': localStorage.getItem('A_TK'),
        id: localStorage.getItem('A_ID')
      });
      return this.http.post('https://api.tokenncoin.com' + '/admin/delInfo/' + id ,
        {field , value}, {headers});
    }
  }

}
